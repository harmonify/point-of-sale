import { CustomerResponseDto } from '@/modules/customer';
import { SaleResponseDto } from '@/modules/sale';

export class DashboardResponseDto {
  totalSales: number;
  totalExpenses: number;
  totalCustomers: number;
  topCustomers: CustomerResponseDto[];
  recentOrders: SaleResponseDto[];
}
