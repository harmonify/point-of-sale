import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseBodyDto } from '../dtos';
import { REQUEST_ID_TOKEN_HEADER } from '../constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const requestId = response.get(REQUEST_ID_TOKEN_HEADER);
    const statusCode = +exception.getStatus();
    const { error, message } = exception.getResponse() as ResponseBodyDto;

    response.status(statusCode).json(
      new ResponseBodyDto({
        statusCode,
        message,
        error,
        requestId,
      }),
    );
  }
}
