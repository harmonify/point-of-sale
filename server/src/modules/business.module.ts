import { SharedModule } from '@/libs';
import { AuthModule } from '@/modules/auth/auth.module';
import { CashFlowModule } from '@/modules/cash-flow/cash-flow.module';
import { CategoryModule } from '@/modules/category/category.module';
import { CustomerModule } from '@/modules/customer/customer.module';
import { DashboardModule } from '@/modules/dashboard/dashboard.module';
import { ExpenseCategoryModule } from '@/modules/expense-category/expense-category.module';
import { ExpenseModule } from '@/modules/expense/expense.module';
import { NotificationModule } from '@/modules/notification/notification.module';
import { ProcurementModule } from '@/modules/procurement/procurement.module';
import { ProductModule } from '@/modules/product/product.module';
import { ReportModule } from '@/modules/reports/report.module';
import { SupplierModule } from '@/modules/supplier/supplier.module';
import { SaleModule } from '@/modules/sale/sale.module';
import { UnitModule } from '@/modules/unit/unit.module';
import { UserModule } from '@/modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    NotificationModule,
    CustomerModule,
    SupplierModule,
    CategoryModule,
    UnitModule,
    ProductModule,
    CashFlowModule,
    ExpenseCategoryModule,
    ExpenseModule,
    ProcurementModule,
    SaleModule,
    DashboardModule,
    ReportModule,
  ],
})
export class BusinessModule {}
