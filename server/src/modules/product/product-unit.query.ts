import { BaseQuery } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

const productUnitQueryField = {
  default: () =>
    ({
      ...BaseQuery.Field.default(),
      name: true,
      description: true,
      wholesalePrice: true,
      sellingPrice: true,
    }) satisfies Prisma.ProductUnitSelectScalar,
} satisfies Record<string, () => Prisma.ProductUnitSelect>;

const productUnitQueryFilter = {
  search: (term: string) =>
    ({
      OR: [{ name: { contains: term } }, { description: { contains: term } }],
    }) satisfies Prisma.ProductUnitWhereInput,
} satisfies Record<string, (...args: any[]) => Prisma.ProductUnitWhereInput>;

export class ProductUnitQuery {
  static readonly Field = productUnitQueryField;
  static readonly Filter = productUnitQueryFilter;
}
