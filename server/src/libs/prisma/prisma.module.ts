import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { APP_FILTER } from '@nestjs/core';
import {
  PrismaHttpClientErrorFilter,
  PrismaHttpServerErrorFilter,
} from './filters';

@Global()
@Module({
  providers: [
    PrismaService,
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
export class PrismaModule {}
