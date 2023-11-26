import { SharedModule } from '@/libs';
import { AuthModule } from '@/modules/auth/auth.module';
import { CustomerModule } from '@/modules/customer';
import { ExpenseModule } from '@/modules/expense';
import { ProcurementModule } from '@/modules/procurement';
import { ProductModule } from '@/modules/product';
import { SaleModule } from '@/modules/sale';
import { UserModule } from '@/modules/user/user.module';
import { ProviderModule } from '@/modules/provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    CustomerModule,
    ProviderModule,
    ProductModule,
    ProcurementModule,
    ExpenseModule,
    SaleModule,
  ],
})
export class BusinessModule {}
