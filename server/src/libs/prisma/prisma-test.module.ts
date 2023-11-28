import { Global, Module } from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import {
  PrismaClientExceptionFilter,
  PrismaModule,
  loggingMiddleware,
} from 'nestjs-prisma';

import {
  PrismaHttpClientErrorFilter,
  PrismaHttpServerErrorFilter,
} from './filters';
import { PrismaService } from './prisma.service';
import { NestConfigModule, NestConfigService } from '@/libs/config';

@Global()
@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      imports: [NestConfigModule],
      inject: [NestConfigService],
      useFactory: (configService: NestConfigService) => ({
        explicitConnect: true,
        middlewares: [loggingMiddleware()],
        prismaOptions: {
          log: ['query', 'info', 'warn', 'error'],
          errorFormat:
            configService.isTest() || configService.isDev()
              ? 'pretty'
              : 'colorless',
          datasourceUrl: `nestjs-prisma`,
        },
      }),
    }),
  ],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
    {
      provide: APP_FILTER,
      useClass: PrismaHttpClientErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaHttpServerErrorFilter,
    },
  ],
  exports: [PrismaService],
})
export class PrismaTestModule {}
