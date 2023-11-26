import { NestI18nModule } from '@/libs/i18n';
import { Module } from '@nestjs/common';

import { GenerateI18nTypesService } from './generate-i18n-types.service';

@Module({
  imports: [NestI18nModule],
  providers: [GenerateI18nTypesService],
})
export class GenerateI18nTypesModule {}
