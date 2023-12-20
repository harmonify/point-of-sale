import { IResponseBody } from '@/libs/http';
import { Body, Controller, HttpStatus, Post, Put } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';

import { CurrentUser, SkipAuth } from './decorators';
import {
  ChangePasswordRequestDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
} from './dtos';
import { AuthService, TokenService } from './services';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @ApiOperation({ description: 'User authentication' })
  @ApiOkResponse({ description: 'Successfully authenticated user' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @SkipAuth()
  @Post('login')
  async login(
    @Body() authCredentialsDto: LoginRequestDto,
  ): Promise<IResponseBody<LoginResponseDto>> {
    // Simulate
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(null);
    //   }, 5000);
    // });
    return {
      statusCode: HttpStatus.OK,
      data: await this.authService.login(authCredentialsDto),
    };
  }

  @ApiOperation({ description: 'Change user password' })
  @Put('password')
  async changePassword(
    @Body() changePassword: ChangePasswordRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.authService.changePassword(changePassword, user);
  }

  @ApiOperation({ description: 'Renew access in the application' })
  @ApiOkResponse({ description: 'token successfully renewed' })
  @ApiUnauthorizedResponse({ description: 'Refresh token invalid or expired' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @SkipAuth()
  @Post('refresh-token')
  async getNewToken(
    @Body() refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<IResponseBody<RefreshTokenResponseDto>> {
    const { refreshToken } = refreshTokenDto;
    const { accessToken, user } =
      await this.tokenService.createAccessTokenFromRefreshToken(refreshToken);
    return {
      statusCode: HttpStatus.OK,
      data: {
        accessToken,
        user,
      },
    };
  }

  @ApiOperation({ description: 'Logout user' })
  @Post('logout')
  async logout(
    @CurrentUser() user: User,
    @Body() { fromAll, refreshToken }: LogoutRequestDto,
  ): Promise<IResponseBody> {
    if (fromAll) {
      await this.authService.logoutFromAll(user);
    } else {
      await this.authService.logout(user, refreshToken);
    }
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
