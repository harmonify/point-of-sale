import { BaseQuery } from '@/libs/prisma';
import { Prisma } from '@prisma/client';
import { CategoryQuery } from '../category';
import { ProductUnitQuery } from './product-unit.query';
import { UserQuery } from '../user';

const productQueryField = {
  default: () =>
    ({
      ...BaseQuery.Field.default(),
      name: true,
      description: true,
      barcode: true,
      barcodeType: true,
    }) satisfies Prisma.ProductSelectScalar,
  defaultRelations: () =>
    ({
      category: { select: CategoryQuery.Field.default() },
      productUnits: { select: ProductUnitQuery.Field.default() },
      createdBy: { select: UserQuery.Field.default() },
    }) satisfies Prisma.ProductSelect,
} satisfies Record<string, () => Prisma.ProductSelect>;

const productQueryFilter = {
  search: (term: string) =>
    ({
      OR: [
        { name: { contains: term } },
        { description: { contains: term } },
        { barcode: { contains: term } },
      ],
    }) satisfies Prisma.ProductWhereInput,
} satisfies Record<string, (...args: any[]) => Prisma.ProductWhereInput>;

export class ProductQuery {
  static readonly Field = productQueryField;
  static readonly Filter = productQueryFilter;
}
