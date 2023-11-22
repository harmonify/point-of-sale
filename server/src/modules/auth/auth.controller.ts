import { UserEntity } from '@database/entities';
import {
  Body,
  Controller,
  DefaultValuePipe,
  ParseBoolPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser, SkipAuth } from '.';
import {
  AuthRequestDto,
  AuthResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
} from './dtos';
import { AuthService, TokenService } from './services';

@SkipAuth()
@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @ApiOperation({ description: 'User authentication' })
  @ApiOkResponse({ description: 'Successfully authenticated user' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/login')
  login(
    @Body(ValidationPipe) authCredentialsDto: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(authCredentialsDto);
  }

  @ApiOperation({ description: 'Renew access in the application' })
  @ApiOkResponse({ description: 'token successfully renewed' })
  @ApiUnauthorizedResponse({ description: 'Refresh token invalid or expired' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/token/refresh')
  async getNewToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    const { refreshToken } = refreshTokenDto;
    const { accessToken } =
      await this.tokenService.createAccessTokenFromRefreshToken(refreshToken);
    return { accessToken };
  }

  @ApiOperation({ description: 'Logout user' })
  @Post('logout')
  async logout(
    @CurrentUser() user: UserEntity,
    @Query('from_all', new DefaultValuePipe(false), ParseBoolPipe)
    fromAll: boolean,
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<boolean> {
    const result = fromAll
      ? await this.authService.logoutFromAll(user)
      : await this.authService.logout(user, refreshTokenDto.refreshToken);

    return !!result;
  }
}
