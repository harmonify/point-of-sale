import { ConflictException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class UserExistsException extends ConflictException {
  constructor(email: string) {
    super({
      error: HttpErrorType.USER_EXISTS,
      message: `There's a user with email '${email}'`,
    });
  }
}
