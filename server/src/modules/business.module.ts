import { SharedModule } from '@/libs';
import { AuthModule } from '@/modules/auth/auth.module';
import { CustomerModule } from '@/modules/customer';
import { ExpenseModule } from '@/modules/expense';
import { ProcurementModule } from '@/modules/procurement';
import { ProductModule } from '@/modules/product';
import { ProductCategoryModule } from '@/modules/product-category';
import { ProviderModule } from '@/modules/provider';
import { SaleModule } from '@/modules/sale';
import { UserModule } from '@/modules/user/user.module';
import { Module } from '@nestjs/common';
import { NotificationModule } from './notification';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    NotificationModule,
    CustomerModule,
    ProviderModule,
    ProductCategoryModule,
    ProductModule,
    ProcurementModule,
    ExpenseModule,
    SaleModule,
  ],
})
export class BusinessModule {}
