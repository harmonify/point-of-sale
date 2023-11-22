import { UnauthorizedException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class AccessTokenExpiredException extends UnauthorizedException {
  constructor() {
    super({
      error: HttpErrorType.ACCESS_TOKEN_EXPIRED,
      message: 'Access token has expired',
    });
  }
}
