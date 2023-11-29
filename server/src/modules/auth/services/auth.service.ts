import { HashUtil } from '@/common/utils';
import {
  InvalidCredentialsException,
  InvalidCurrentPasswordException,
} from '@/libs/http';
import { PrismaService } from '@/libs/prisma';
import { ChangePasswordRequestDto } from '@/modules/auth/dtos';
import { UserResponseDto } from '@/modules/user/dtos';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { lastValueFrom, map, zip } from 'rxjs';

import { LoginRequestDto, LoginResponseDto } from '../dtos';
import { TokenService } from './token.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<IConfig, true>,
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
    private readonly i18nService: I18nService,
  ) {}

  /**
   * We validate the user, if the user is valid, we generate an access token and a refresh token
   * @param loginDto - UserLoginDto - This is the DTO that we created earlier.
   * @param isPasswordLogin - boolean - This is a boolean value that tells the function whether
   * the user is logging in with a password or oauth
   */
  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException(
        this.i18nService.translate('exception.itemDoesNotExist', {
          args: { item: 'Account' },
        }),
      );
    }

    if (!(await HashUtil.compare(loginDto.password, user.password))) {
      throw new InvalidCredentialsException();
    }

    if (!user.isActive) {
      throw new ForbiddenException(
        this.i18nService.translate('exception.userBlocked'),
      );
    }

    const userDto = new UserResponseDto(user);

    return lastValueFrom(
      zip(
        this.tokenService.generateAccessToken(user),
        this.tokenService.generateRefreshToken(user),
      ).pipe(
        map(([accessToken, refreshToken]) => ({
          user: userDto,
          tokenType: this.configService.get('jwt.tokenType', { infer: true }),
          accessToken,
          refreshToken,
        })),
      ),
    );
  }

  /**
   * It takes a user and a DTO, then it checks if the current password is valid, if it is, it updates the
   * password and returns the user
   * @param dto - ChangePasswordDto - This is the DTO that we created earlier.
   * @param user - User - The user object that is currently logged in.
   */
  async changePassword(
    dto: ChangePasswordRequestDto,
    user: User,
  ): Promise<UserResponseDto> {
    const { newPassword, currentPassword } = dto;

    const userDetails = await this.prismaService.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    });

    if (!(await HashUtil.compare(currentPassword, userDetails.password))) {
      throw new InvalidCurrentPasswordException();
    }

    const newUserDetails = await this.prismaService.user.update({
      data: {
        password: newPassword,
      },
      where: {
        id: user.id,
      },
    });

    return new UserResponseDto(newUserDetails);
  }

  /**
   * It deletes all refresh tokens for a given user
   * @param user - User - The user object that you want to logout from.
   */
  async logoutFromAll(user: User): Promise<UserResponseDto> {
    await this.tokenService.deleteRefreshTokenForUser(user);
    return new UserResponseDto(user);
  }

  /**
   * We decode the refresh token, then delete the refresh token from the database
   * @param user - The user object that was returned from the login method.
   * @param refreshToken - The refresh token that was sent to the client.
   */
  async logout(user: User, refreshToken: string): Promise<UserResponseDto> {
    const payload = await this.tokenService.decodeRefreshToken(refreshToken);
    await this.tokenService.deleteRefreshToken(user, payload);
    return new UserResponseDto(user);
  }
}
