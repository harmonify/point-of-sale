import { UnauthorizedException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super({
      error: HttpErrorType.INVALID_CREDENTIALS,
      message: 'Invalid credentials',
    });
  }
}
