// src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { DashboardResponseDto } from './dtos';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardInfo(): Promise<DashboardResponseDto> {
    try {
      const totalSalesAggregate = await this.prisma.sale.aggregate({
        _sum: { netAmount: true },
      });
      const totalExpensesAggregate = await this.prisma.expense.aggregate({
        _sum: { amount: true },
      });
      const totalCustomers = await this.prisma.customer.count();

      // Fetch the top 5 customers
      const topCustomers = await this.prisma.customer.findMany({
        take: 5,
        include: {
          createdBy: true,
        },
        orderBy: {
          sales: {
            _count: 'desc',
          },
        },
      });

      // Fetch the 10 most recent orders
      const recentOrders = await this.prisma.sale.findMany({
        take: 10,
        include: {
          createdBy: true,
          saleProducts: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        totalSales: totalSalesAggregate._sum.netAmount || 0,
        totalExpenses: totalExpensesAggregate._sum.amount || 0,
        totalCustomers,
        topCustomers,
        recentOrders,
      };
    } catch (error) {
      throw new Error(`Error fetching dashboard information: ${error.message}`);
    }
  }
}