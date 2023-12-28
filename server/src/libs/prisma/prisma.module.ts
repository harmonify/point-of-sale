import { NestConfigModule, NestConfigService } from '@/libs/config';
import { Global, Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';

import {
  PrismaHttpClientErrorFilter,
  PrismaHttpServerErrorFilter,
} from './filters';

@Global()
@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      imports: [NestConfigModule],
      inject: [NestConfigService],
      useFactory: (configService: NestConfigService) => ({
        // explicitConnect: true,
        middlewares: [
          loggingMiddleware({
            logLevel: configService.isProd()
              ? 'log'
              : configService.isDev() || configService.isStaging()
                ? 'debug'
                : 'warn',
            logger: new Logger('PrismaORM'),
          }),
        ],
        prismaOptions: {
          datasourceUrl: process.env.DATABASE_URL,
          log: configService.isProd()
            ? ['info', 'warn', 'error']
            : configService.isDev() || configService.isStaging()
              ? ['query', 'info', 'warn', 'error']
              : ['warn', 'error'],
          errorFormat:
            configService.isTest() || configService.isDev()
              ? 'pretty'
              : 'colorless',
        },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaHttpClientErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaHttpServerErrorFilter,
    },
  ],
})
export class NestPrismaModule {}
