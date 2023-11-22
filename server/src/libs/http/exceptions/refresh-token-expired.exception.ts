import { UnauthorizedException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class RefreshTokenExpiredException extends UnauthorizedException {
  constructor() {
    super({
      error: HttpErrorType.REFRESH_TOKEN_EXPIRED,
      message: 'Refresh token has expired',
    });
  }
}
