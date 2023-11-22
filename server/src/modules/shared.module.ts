import { NestConfigModule } from '@/libs/config/config.module';
import { NestPinoModule } from '@/libs/logger';
import { PrismaModule } from '@/libs/prisma';
import { NestThrottlerModule } from '@/libs/throttle.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    NestConfigModule,
    NestPinoModule,
    NestThrottlerModule,
    PrismaModule,
    AuthModule,
    UserModule,
    ScheduleModule.forRoot(),
  ],
})
export class SharedModule {}
