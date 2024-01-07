import { Injectable } from '@nestjs/common';
import { Prisma, ProductUnit } from '@prisma/client';
import _ from 'lodash';
import { PrismaService } from 'nestjs-prisma';
import { BaseQuery } from '@/libs/prisma';

@Injectable()
export class ProductUnitService {
  constructor(private readonly prismaService: PrismaService) {}

  countProductUnitAvailableQuantity(
    productUnit: Prisma.ProductUnitGetPayload<{
      include: {
        procurementProducts: { select: { quantity: true } };
        saledProducts: { select: { quantity: true } };
      };
    }>,
  ): number {
    return Math.max(
      _.sumBy(productUnit.procurementProducts, (pp) => pp.quantity) -
        _.sumBy(productUnit.saledProducts, (sp) => sp.quantity),
      0,
    );
  }

  async countProductUnitAvailableQuantityAsync(
    productUnitId: number,
  ): Promise<number> {
    const procuredProductsCount =
      await this.prismaService.procurementProduct.aggregate({
        _sum: {
          quantity: true,
        },
        where: {
          ...BaseQuery.Filter.available(),
          productUnitId: productUnitId,
        },
      });

    const saledProductsCount = await this.prismaService.saleProduct.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        ...BaseQuery.Filter.available(),
        productUnitId: productUnitId,
      },
    });

    return Math.max(
      (procuredProductsCount._sum.quantity || 0) -
        (saledProductsCount._sum.quantity || 0),
      0,
    );
  }
}
