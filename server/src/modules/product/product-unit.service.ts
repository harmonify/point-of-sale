import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import _ from 'lodash';

@Injectable()
export class ProductUnitService {
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
}
