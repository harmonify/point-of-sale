import { ForbiddenException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class BlockedUserException extends ForbiddenException {
  constructor() {
    super({
      error: HttpErrorType.BLOCKED_USER,
      message: 'User not authorized to login',
    });
  }
}
