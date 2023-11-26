import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseBodyDto } from '../dtos';
import { REQUEST_ID_TOKEN_HEADER } from '../constants';
import { Reflector } from '@nestjs/core';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';

/**
 * This HTTP response interceptor does 3 things:
 * 1. Standardize the response body structure (stripping non-whitelisted response body properties).
 * 2. Append the request ID from the request header value to the response body.
 * 3. Set the response status code from the response body payload if it hadn't been set through NestJS `@HttpCode` decorator before.
 * @see {@link ../dtos/response-body.dto.ts}
 * @see {@link ../middlewares/request-id.middleware.ts}
 */
@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseBodyDto<T>> {
    const response: Response = context.switchToHttp().getResponse();

    const requestId = response.get(REQUEST_ID_TOKEN_HEADER);

    const nestStatusCodeFromMetadata = this.reflector.get(
      HTTP_CODE_METADATA,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((payload) => {
        if (payload && payload.statusCode && !nestStatusCodeFromMetadata) {
          response.status(payload.statusCode);
        }
        return new ResponseBodyDto({ ...payload, requestId });
      }),
    );
  }
}
