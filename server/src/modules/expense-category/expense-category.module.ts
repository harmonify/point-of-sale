import { Module } from '@nestjs/common';
import { ExpenseCategoryController } from './expense-category.controller';

@Module({
  controllers: [ExpenseCategoryController],
})
export class ExpenseCategoryModule {}
