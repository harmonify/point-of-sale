import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { prismaHttpClientErrorRecord } from '../constants';
import { PrismaClientErrorCode } from '../enums';

/**
 * @see {@link https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientknownrequesterror}
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaHttpClientErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaHttpClientErrorFilter.name);

  public catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error =
      prismaHttpClientErrorRecord[
        exception.code as keyof typeof PrismaClientErrorCode
      ];

    if (error) {
      return response.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    } else {
      this.logger.error(exception, exception.stack);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
