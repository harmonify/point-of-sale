// src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { DashboardResponseDto } from './dtos';
import { BaseQuery } from '@/libs/prisma';
import { SaleService } from '../sale';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly saleService: SaleService,
  ) {}

  async getDashboardInfo(): Promise<DashboardResponseDto> {
    try {
      const totalSalesAggregate = await this.prisma.sale.aggregate({
        _sum: { total: true },
        _count: { _all: true },
        where: BaseQuery.Filter.available(),
      });

      const totalExpenses = await this.prisma.procurementProduct
        .findMany({
          select: { price: true, quantity: true },
          where: BaseQuery.Filter.available(),
        })
        .then((procurementProducts) =>
          procurementProducts.reduce(
            (acc, pp) => acc + pp.price * pp.quantity,
            0,
          ),
        );

      // const totalCustomers = await this.prisma.customer.count({
      //   where: BaseQuery.Filter.available(),
      // });

      // // Fetch the top 5 customers
      // const topCustomers = await this.prisma.customer
      //   .findMany({
      //     take: 5,
      //     include: {
      //       createdBy: {
      //         select: { name: true },
      //       },
      //       sales: {
      //         select: { total: true },
      //       },
      //     },
      //     orderBy: {
      //       sales: {
      //         _count: 'desc',
      //       },
      //     },
      //     where: BaseQuery.Filter.available(),
      //   })
      //   .then((customers) => {
      //     return customers.map((c) => {
      //       const purchasedAmount = c.sales.reduce(
      //         (acc, sale) => acc + sale.total,
      //         0,
      //       );
      //       return { ...c, purchasedAmount };
      //     });
      //   });

      // Fetch the 10 most recent orders
      const recentOrders = await this.prisma.sale.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        where: BaseQuery.Filter.available(),
        ...this.saleService.getSalePayloadToken(),
      });

      return {
        totalOrders: totalSalesAggregate._count._all || 0,
        totalSales: totalSalesAggregate._sum.total || 0,
        totalExpenses: totalExpenses || 0,
        recentOrders: recentOrders.map((sale) => ({
          ...sale,
          saleProducts: this.saleService.mapSaleProducts(sale.saleProducts),
        })),
      };
    } catch (error) {
      throw new Error(`Error fetching dashboard information: ${error.message}`);
    }
  }
}
