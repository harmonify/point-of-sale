import { UnauthorizedException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class DisabledUserException extends UnauthorizedException {
  constructor() {
    super({
      error: HttpErrorType.BLOCKED_USER,
      message: 'User not authorized to login',
    });
  }
}
