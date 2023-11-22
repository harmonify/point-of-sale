import { ConflictException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class ForeignKeyConflictException extends ConflictException {
  constructor() {
    super({
      error: HttpErrorType.FOREIGN_KEY_CONFLICT,
      message: `Foreign key conflict`,
    });
  }
}
