import { ForbiddenException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class InactiveUserException extends ForbiddenException {
  constructor(message: string | null | undefined) {
    super({
      error: HttpErrorType.INACTIVE_USER,
      message: message || 'User not authorized to login',
    });
  }
}
