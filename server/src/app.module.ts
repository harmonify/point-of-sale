import { NestHttpModule } from '@/libs/http';
import { SharedModule } from '@/modules/shared.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

@Module({
  imports: [SharedModule, NestHttpModule],
  controllers: [AppController],
})
export class AppModule {
  constructor() {}
}
