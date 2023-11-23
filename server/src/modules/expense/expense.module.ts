import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseTypeController } from './expense-type.controller';

@Module({
  controllers: [ExpenseController, ExpenseTypeController],
})
export class ExpenseModule {}
