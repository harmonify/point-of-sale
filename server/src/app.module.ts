import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SharedModule } from '@modules/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [AppController],
})
export class AppModule {
  constructor() {}
}
