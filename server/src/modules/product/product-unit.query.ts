import { BaseQuery } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

const productUnitQueryField = {
  default: () =>
    ({
      ...BaseQuery.Field.default(),
      productId: true,
      price: true,
      // wholesalePrice: true,
    }) satisfies Prisma.ProductUnitSelectScalar,
} satisfies Record<string, () => Prisma.ProductUnitSelect>;

const productUnitQueryRelation = {
  withQuantityRelationData: () =>
    ({
      procurementProducts: {
        select: {
          quantity: true,
        },
      },
      saledProducts: {
        select: {
          quantity: true,
        },
      },
    }) satisfies Prisma.ProductUnitInclude,
} satisfies Record<string, () => Prisma.ProductUnitInclude>;

const productUnitQueryFilter = {} satisfies Record<
  string,
  (...args: any[]) => Prisma.ProductUnitWhereInput
>;

export class ProductUnitQuery {
  static readonly Field = productUnitQueryField;
  static readonly Relation = productUnitQueryRelation;
  static readonly Filter = productUnitQueryFilter;
}
