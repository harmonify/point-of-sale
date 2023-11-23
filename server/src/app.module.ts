import { SharedModule } from '@/libs';
import { NestHttpModule } from '@/libs/http';
import { BusinessModule } from '@/modules';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

@Module({
  imports: [SharedModule, NestHttpModule, BusinessModule],
  controllers: [AppController],
})
export class AppModule {
  constructor() {}
}
