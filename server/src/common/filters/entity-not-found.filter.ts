import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { NotFoundError } from '@mikro-orm/core';

/**
 * Filter EntityNotFoundError from TypeOrm to NestJs responses
 * @see {@link https://docs.nestjs.com/exception-filters}
 */
@Catch(NotFoundError)
export class EntityNotFoundErrorFilter implements ExceptionFilter {
  public catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
