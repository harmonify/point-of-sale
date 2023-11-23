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

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseBodyDto<T>> {
    const response: Response = context.switchToHttp().getResponse();
    const requestId = response.get(REQUEST_ID_TOKEN_HEADER);
    return next
      .handle()
      .pipe(map((payload) => new ResponseBodyDto({ ...payload, requestId })));
  }
}
