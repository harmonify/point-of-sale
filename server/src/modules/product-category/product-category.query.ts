import { BaseQuery } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

const productCategoryQueryField = {
  default: () =>
    ({
      ...BaseQuery.Field.default(),
      name: true,
      description: true,
    }) satisfies Prisma.ProductCategorySelectScalar,
} satisfies Record<string, () => Prisma.ProductCategorySelectScalar>;

const productCategoryQueryFilter = {
  search: (term: string) =>
    ({
      OR: [{ name: { contains: term } }, { description: { contains: term } }],
    }) satisfies Prisma.ProductCategoryWhereInput,
} satisfies Record<
  string,
  (...args: any[]) => Prisma.ProductCategoryWhereInput
>;

export class ProductCategoryQuery {
  static readonly Field = productCategoryQueryField;
  static readonly Filter = productCategoryQueryFilter;
}
