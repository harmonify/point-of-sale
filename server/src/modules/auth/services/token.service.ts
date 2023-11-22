import { UserEntity } from '@database/entities';
import { BaseRepository } from '@libs/crud';
import { translate } from '@libs/i18n';
import { RefreshTokenRepository } from '@modules/auth/refresh-token.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';

import type { JwtSignOptions } from '@nestjs/jwt';
import { RefreshTokenEntity } from '@database/entities';
import type { JwtPayload } from '@modules/auth/dtos';
import { TokenError, TokenType } from '../enums';
import {
  AccessTokenExpiredException,
  InvalidTokenException,
  RefreshTokenExpiredException,
} from '@common/http/exceptions';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  private readonly BASE_OPTIONS: JwtSignOptions = {
    issuer: 'nestify',
    audience: 'nestify',
  };

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: BaseRepository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepo: RefreshTokenRepository,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService<Configs, true>,
  ) {}

  /**
   * It takes a user object, and returns an observable of a string
   * @param user - Omit<UserEntity, "password">
   * @returns An Promise of a string.
   */
  generateAccessToken(user: Omit<UserEntity, 'password'>): Promise<string> {
    const options: JwtSignOptions = {
      ...this.BASE_OPTIONS,
      subject: String(user._id),
      expiresIn: this.configService.get('jwt.accessExpiry', {
        infer: true,
      }),
    };

    return this.jwt.signAsync({ _id: user._id }, options);
  }

  /**
   * It creates a refresh token in the database, then signs it with JWT
   * @param user - UserEntity - The user object that we want to generate a token for.
   * @returns A string
   */
  async generateRefreshToken(user: UserEntity): Promise<string> {
    const expiresIn = this.configService.get('jwt.refreshExpiry', {
      infer: true,
    });

    const token = await this.refreshTokenRepo.createRefreshToken(
      user,
      expiresIn,
    );

    const options: JwtSignOptions = {
      ...this.BASE_OPTIONS,
      expiresIn,
      subject: String(user._id),
      jwtid: String(token._id),
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
  ): Promise<{ user: UserEntity; token: RefreshTokenEntity }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);
    if (!token) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'not found' },
        }),
      );
    }
    if (!token.isActive) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'revoked' },
        }),
      );
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);
    if (!user) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
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
  ): Promise<{ accessToken: string; user: UserEntity }> {
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
            translate('exception.refreshToken', {
              args: { error: 'expired' },
            }),
          )
        : new UnauthorizedException(
            translate('exception.refreshToken', {
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
  async deleteRefreshTokenForUser(user: UserEntity): Promise<UserEntity> {
    await this.refreshTokenRepo.deleteTokensForUser(user);
    return user;
  }

  /**
   * It deletes the refresh token from the database and returns the user
   * @param user - The user object that was returned from the validateUser method.
   * @param payload - The payload of the refresh token.
   * @returns The user object
   */
  async deleteRefreshToken(
    user: UserEntity,
    payload: JwtPayload,
  ): Promise<UserEntity> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      );
    }

    await this.refreshTokenRepo.deleteToken(user, tokenId);
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
  ): Promise<UserEntity | null> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      );
    }

    return this.userRepository.findOne({
      id: subId,
    });
  }

  /**
   * It takes a refresh token payload, extracts the token ID from it, and then uses that token ID to
   * find the corresponding refresh token in the database
   * @param payload - IJwtPayload
   * @returns Promise<RefreshToken | null>
   */
  getStoredTokenFromRefreshTokenPayload(
    payload: JwtPayload,
  ): Promise<RefreshTokenEntity | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnauthorizedException(
        translate('exception.refreshToken', {
          args: { error: 'malformed' },
        }),
      );
    }

    return this.refreshTokenRepo.findTokenById(tokenId);
  }
}
