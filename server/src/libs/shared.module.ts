import { NestConfigModule } from '@/libs/config';
import { NestI18nModule } from '@/libs/i18n';
import { NestPinoModule } from '@/libs/logger';
import { PrismaModule } from '@/libs/prisma';
import { NestThrottlerModule } from '@/libs/throttle.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    NestConfigModule,
    NestI18nModule,
    NestPinoModule,
    NestThrottlerModule,
    ScheduleModule.forRoot(),
    PrismaModule,
  ],
})
export class SharedModule {}
