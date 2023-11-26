import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HttpExceptionFilter } from './filters';
import {
  HttpRequestSanitizerInterceptor,
  HttpResponseInterceptor,
} from './interceptors';
import { RealIpMiddleware, RequestIdMiddleware } from './middlewares';
import { NestThrottlerModule } from './throttle.module';

const modules = [
  // NestHttpClientModule,
  // NestServeStaticModule,
  NestThrottlerModule,
];

@Global()
@Module({
  imports: modules,
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpRequestSanitizerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpResponseInterceptor,
    },
  ],
  exports: modules,
})
export class NestHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RealIpMiddleware, RequestIdMiddleware).forRoutes('*');
  }
}
