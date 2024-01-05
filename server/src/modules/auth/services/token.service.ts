import { APP_NAME } from '@/common/constants';
import { StringUtil } from '@/common/utils';
import {
  AccessTokenExpiredException,
  InvalidTokenException,
  RefreshTokenExpiredException,
} from '@/libs/http/exceptions';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '@prisma/client';
import { TokenExpiredError } from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'nestjs-prisma';
import { BaseQuery } from '@/libs/prisma';

import { TokenError, TokenType } from '../enums';

import type { JwtSignOptions } from '@nestjs/jwt';
import type { JwtPayload, RefreshTokenResponseDto } from '@/modules/auth/dtos';
import { UserQuery, UserResponseDto } from '@/modules/user';

@Injectable()
export class TokenService {
  private readonly BASE_OPTIONS: JwtSignOptions = {
    issuer: APP_NAME,
    audience: APP_NAME,
  };

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService<IConfig, true>,
    private readonly i18nService: I18nService,
  ) {}

  /**
   * It takes a user object, and returns an observable of a string
   * @param user - Omit<UserResponseDto, "password">
   * @returns An Promise of a string.
   */
  generateAccessToken(user: UserResponseDto): Promise<string> {
    const options: JwtSignOptions = {
      ...this.BASE_OPTIONS,
      subject: String(user.id),
      expiresIn: this.configService.get('jwt.accessExpiry', {
        infer: true,
      }),
    };

    return this.jwt.signAsync({ id: user.id }, options);
  }

  /**
   * It creates a refresh token in the database, then signs it with JWT
   * @param user - UserResponseDto - The user object that we want to generate a token for.
   * @returns A string
   */
  async generateRefreshToken(user: UserResponseDto): Promise<string> {
    const expiresIn = this.configService.get('jwt.refreshExpiry', {
      infer: true,
    });
    const expiredAt = DateTime.now().plus({ seconds: expiresIn }).toJSDate();
    const token = await this.prismaService.refreshToken.create({
      data: {
        userId: user.id,
        expiredAt,
      },
    });

    const options: JwtSignOptions = {
      ...this.BASE_OPTIONS,
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.id),
    };

    return this.jwt.signAsync({}, options);
  }

  /**
   * It takes an encoded refresh token, decodes it, finds the user and token in the database, and
   * returns them
   * @param encoded - string - The encoded refresh token
   * @returns An object with a user and a token.
   */
  async resolveRefreshToken(
    encoded: string,
  ): Promise<{ user: UserResponseDto; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);
    if (!token) {
      throw new UnauthorizedException(
        this.i18nService.translate('exception.refreshToken', {
          args: { error: 'not found' },
        }),
      );
    }
    if (!token.isActive) {
      throw new UnauthorizedException(
        this.i18nService.translate('exception.refreshToken', {
          args: { error: 'revoked' },
        }),
      );
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);
    if (!user) {
      throw new UnauthorizedException(
        this.i18nService.translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      );
    }

    return { user, token };
  }

  /**
   * It takes a refresh token, resolves it to a user, and then generates an access token for that user
   * @param refresh - string - The refresh token that was sent to the client.
   * @returns An object with a token and a user.
   */
  async createAccessTokenFromRefreshToken(
    refreshToken: string,
  ): Promise<RefreshTokenResponseDto> {
    const { user } = await this.resolveRefreshToken(refreshToken);
    const accessToken = await this.generateAccessToken(user);
    return { accessToken, user };
  }

  /**
   * It decodes the refresh token and throws an error if the token is expired or malformed
   * @param token - The refresh token to decode.
   * @returns The payload of the token.
   */
  async decodeRefreshToken(token: string): Promise<JwtPayload> {
    try {
      const payload: JwtPayload = await this.jwt.verifyAsync(token);
      return payload;
    } catch (error) {
      throw error instanceof TokenExpiredError
        ? new UnauthorizedException(
            this.i18nService.translate('exception.refreshToken', {
              args: { error: 'expired' },
            }),
          )
        : new UnauthorizedException(
            this.i18nService.translate('exception.refreshToken', {
              args: { error: 'malformed' },
            }),
          );
    }
  }

  /**
   * Verify JWT service
   * @param token JWT token
   * @param type {TokenType} 'refresh' or 'access'
   * @returns decrypted payload from JWT
   */
  public verifyToken(token: string, type: TokenType) {
    try {
      return this.jwt.verify(token);
    } catch ({ name }) {
      if (
        name == TokenError.TokenExpiredError &&
        type == TokenType.AccessToken
      ) {
        throw new AccessTokenExpiredException();
      }
      if (
        name == TokenError.TokenExpiredError &&
        type == TokenType.RefreshToken
      ) {
        throw new RefreshTokenExpiredException();
      }
      throw new InvalidTokenException();
    }
  }

  /**
   * It deletes all the refresh token for the given user, and then returns the user
   * @param user - The user object that we want to delete the refresh token for.
   * @returns The user object.
   */
  async deleteRefreshTokenForUser(
    user: UserResponseDto,
  ): Promise<UserResponseDto> {
    await this.prismaService.refreshToken.updateMany({
      data: { isActive: false },
      where: {
        user,
      },
    });
    return user;
  }

  /**
   * It deletes the refresh token from the database and returns the user
   * @param user - The user object that was returned from the validateUser method.
   * @param payload - The payload of the refresh token.
   * @returns The user object
   */
  async deleteRefreshToken(
    user: UserResponseDto,
    payload: JwtPayload,
  ): Promise<UserResponseDto> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnauthorizedException(
        this.i18nService.translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      );
    }

    await this.prismaService.refreshToken.update({
      data: { isActive: false },
      where: { user, id: tokenId },
    });
    return user;
  }

  /**
   * It takes a refresh token payload, extracts the user ID from it, and then returns an observable of
   * the user with that ID
   * @param payload - IJwtPayload
   * @returns A user object
   */
  getUserFromRefreshTokenPayload(
    payload: JwtPayload,
  ): Promise<UserResponseDto | null> {
    try {
      const subId = StringUtil.toNumber({
        value: payload.sub,
        throwIfFailed: true,
      });
      return this.prismaService.user.findFirst({
        select: UserQuery.Field.default(),
        where: {
          id: subId,
          ...BaseQuery.Filter.isActive(),
        },
      });
    } catch (error) {
      throw new UnauthorizedException(
        this.i18nService.translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      );
    }
  }

  /**
   * It takes a refresh token payload, extracts the token ID from it, and then uses that token ID to
   * find the corresponding refresh token in the database
   * @param payload - IJwtPayload
   * @returns Promise<RefreshToken | null>
   */
  getStoredTokenFromRefreshTokenPayload(
    payload: JwtPayload,
  ): Promise<RefreshToken | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnauthorizedException(
        this.i18nService.translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      );
    }

    return this.prismaService.refreshToken.findFirst({
      where: { id: payload.jti, ...BaseQuery.Filter.isActive() },
    });
  }
}
