import { IsUniqueConstraint } from '@common/decorators';
import { NestConfigModule } from '@libs/config/config.module';
import { CrudModule } from '@libs/crud/crud.module';
import { NestHttpModule } from '@libs/http.module';
import { NestPinoModule } from '@libs/logger';
import { NestThrottlerModule } from '@libs/throttle.module';
import { AuthModule } from '@modules/auth/auth.module';
import { HealthModule } from '@modules/health/health.module';
import { UserModule } from '@modules/users/user.module';
import { WhatsappModule } from '@modules/whatsapp/whatsapp.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    NestPinoModule,
    NestConfigModule,
    NestHttpModule,
    NestThrottlerModule,
    // NestServeStaticModule,
    CrudModule,
    HealthModule,
    AuthModule,
    UserModule,
    WhatsappModule,
    ScheduleModule.forRoot(),
  ],
  providers: [IsUniqueConstraint],
})
export class SharedModule {}
