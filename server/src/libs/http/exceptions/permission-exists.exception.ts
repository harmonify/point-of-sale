import { ConflictException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class PermissionExistsException extends ConflictException {
  constructor(slug: string) {
    super({
      error: HttpErrorType.PERMISSION_EXISTS,
      message: `There's a permission with slug '${slug}'`,
    });
  }
}
