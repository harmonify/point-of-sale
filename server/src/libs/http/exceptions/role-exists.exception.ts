import { ConflictException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class RoleExistsException extends ConflictException {
  constructor(name: string) {
    super({
      error: HttpErrorType.ROLE_EXISTS,
      message: `There's a role with name '${name}'`,
    });
  }
}
