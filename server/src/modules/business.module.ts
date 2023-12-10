import { SharedModule } from '@/libs';
import { AuthModule } from '@/modules/auth';
import { CategoryModule } from '@/modules/category';
import { CustomerModule } from '@/modules/customer';
import { ExpenseModule } from '@/modules/expense';
import { ExpenseCategoryModule } from '@/modules/expense-category';
import { NotificationModule } from '@/modules/notification';
import { ProcurementModule } from '@/modules/procurement';
import { ProductModule } from '@/modules/product';
import { ProviderModule } from '@/modules/provider';
import { SaleModule } from '@/modules/sale';
import { UnitModule } from '@/modules/unit';
import { UserModule } from '@/modules/user';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    NotificationModule,
    CustomerModule,
    ProviderModule,
    CategoryModule,
    UnitModule,
    ProductModule,
    ExpenseCategoryModule,
    ExpenseModule,
    ProcurementModule,
    SaleModule,
  ],
})
export class BusinessModule {}
