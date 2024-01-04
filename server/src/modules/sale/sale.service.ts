import { SaleProductRecord, SaleReport } from '@/modules/reports/dtos';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SaleService {
  constructor(private readonly prismaService: PrismaService) {}

  getSalePayloadToken() {
    return {
      include: {
        saleProducts: {
          include: {
            productUnit: {
              include: {
                product: {
                  include: {
                    category: { select: { name: true } },
                  },
                },
                unit: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    } satisfies Prisma.SaleDefaultArgs;
  }

  createSaleReport(
    sales: Prisma.SaleGetPayload<
      ReturnType<SaleService['getSalePayloadToken']>
    >[],
  ): SaleReport {
    return sales.reduce(
      (acc, s) => {
        acc.subTotal += s.subTotal;
        acc.discountTotal += s.discountTotal;
        acc.taxTotal += s.taxTotal;
        acc.total += s.total;
        acc.saleProducts.push(
          ...s.saleProducts.map(
            (sp) =>
              ({
                categoryName: sp.productUnit.product.category.name,
                barcode: sp.productUnit.product.barcode || '-',
                productName: sp.productUnit.product.name,
                unitName: sp.productUnit.unit.name,
                salePrice: sp.salePrice,
                quantity: sp.quantity,
                discount: sp.discount,
                total: sp.total,
                createdAt: sp.createdAt,
              }) satisfies SaleProductRecord,
          ),
        );
        return acc;
      },
      {
        subTotal: 0.0,
        discountTotal: 0.0,
        taxTotal: 0.0,
        total: 0.0,
        saleProducts: [] as SaleProductRecord[],
      } as any,
    ) as any;
  }

  async getDailySalesReport(): Promise<SaleReport> {
    const now = DateTime.now();
    const startOfDay = now.startOf('day').toJSDate();
    const endOfDay = now.endOf('day').toJSDate();

    // eslint-disable-next-line prisma-soft-delete/use-deleted-null
    const sales = await this.prismaService.sale.findMany({
      ...this.getSalePayloadToken(),
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
        deletedAt: null,
      },
    });

    return this.createSaleReport(sales);
  }

  async getMonthlySalesReport(): Promise<SaleReport> {
    const now = DateTime.now();
    const startOfMonth = now.startOf('month');
    const endOfMonth = now.endOf('month');

    // eslint-disable-next-line prisma-soft-delete/use-deleted-null
    const sales = await this.prismaService.sale.findMany({
      ...this.getSalePayloadToken(),
      where: {
        createdAt: {
          gte: startOfMonth.toJSDate(),
          lte: endOfMonth.toJSDate(),
        },
        deletedAt: null,
      },
    });

    return this.createSaleReport(sales);
  }

  async getYearlySalesReport(): Promise<SaleReport> {
    const now = DateTime.now();
    const startOfYear = now.startOf('year');
    const endOfYear = now.endOf('year');

    // eslint-disable-next-line prisma-soft-delete/use-deleted-null
    const sales = await this.prismaService.sale.findMany({
      ...this.getSalePayloadToken(),
      where: {
        createdAt: {
          gte: startOfYear.toJSDate(),
          lte: endOfYear.toJSDate(),
        },
        deletedAt: null,
      },
    });

    return this.createSaleReport(sales);
  }
}
