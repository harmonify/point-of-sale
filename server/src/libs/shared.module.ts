import { NestConfigModule } from '@/libs/config';
import { NestI18nModule } from '@/libs/i18n';
import { NestLoggerModule } from '@/libs/logger';
import { PrismaModule } from '@/libs/prisma';
import { Global, Module } from '@nestjs/common';
// import { ScheduleModule } from '@nestjs/schedule';

const modules = [
  NestConfigModule,
  NestI18nModule,
  NestLoggerModule,
  PrismaModule,
];

@Global()
@Module({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
