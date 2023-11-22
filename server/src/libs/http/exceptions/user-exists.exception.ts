import { ConflictException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class UserExistsException extends ConflictException {
  constructor(username: string) {
    super({
      error: HttpErrorType.USER_EXISTS,
      message: `There's a user with username '${username}'`,
    });
  }
}
