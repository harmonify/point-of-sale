import { ForbiddenException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class InvalidCurrentPasswordException extends ForbiddenException {
  constructor() {
    super({
      error: HttpErrorType.INVALID_CURRENT_PASSWORD,
      message: 'The current password is invalid',
    });
  }
}
