import { BaseQuery } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

const categoryQueryField = {
  default: () =>
    ({
      ...BaseQuery.Field.default(),
      name: true,
      description: true,
    }) satisfies Prisma.CategorySelectScalar,
} satisfies Record<string, () => Prisma.CategorySelectScalar>;

const categoryQueryFilter = {
  search: (term: string) =>
    ({
      OR: [{ name: { contains: term } }, { description: { contains: term } }],
    }) satisfies Prisma.CategoryWhereInput,
} satisfies Record<string, (...args: any[]) => Prisma.CategoryWhereInput>;

export class CategoryQuery {
  static readonly Field = categoryQueryField;
  static readonly Filter = categoryQueryFilter;
}
