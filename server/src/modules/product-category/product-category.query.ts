import { BaseQuery } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

import type { IPrismaBaseFields } from '@/libs/prisma';

const productCategoryQueryField = {
  default: () => ({
    ...BaseQuery.Field.default(),
    name: true,
    description: true,
  }),
} satisfies Record<
  string,
  () => Omit<Prisma.ProductCategorySelectScalar, keyof IPrismaBaseFields>
>;

const productCategoryQueryFilter = {
  search: (term: string) => ({
    OR: [{ name: { contains: term } }, { description: { contains: term } }],
  }),
} satisfies Record<
  string,
  (
    ...args: any
  ) => Prisma.ProductCategoryWhereInput | Prisma.ProductCategoryWhereInput[]
>;

export class ProductCategoryQuery {
  static readonly Field = productCategoryQueryField;
  static readonly Filter = productCategoryQueryFilter;
}
