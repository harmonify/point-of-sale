import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseBodyDto } from '../dtos';

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseBodyDto<T>> {
    return next.handle().pipe(map((payload) => new ResponseBodyDto(payload)));
  }
}
