import { UnauthorizedException } from '@nestjs/common';
import { HttpErrorType } from '../enums';

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super({ error: HttpErrorType.INVALID_TOKEN });
  }
}
