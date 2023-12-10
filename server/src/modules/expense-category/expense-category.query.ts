import { Prisma } from '@prisma/client';

const expenseCategoryQueryField = {} satisfies Record<
  string,
  () => Prisma.ExpenseCategorySelectScalar
>;

const expenseCategoryQueryFilter = {
  search: (term: string) =>
    ({
      OR: [
        { name: { contains: term } },
        { description: { contains: term } },
        { account: { contains: term } },
        { createdBy: { name: { contains: term } } },
      ],
    }) satisfies Prisma.ExpenseCategoryWhereInput,
} satisfies Record<
  string,
  (...args: any[]) => Prisma.ExpenseCategoryWhereInput
>;

export class ExpenseCategoryQuery {
  static readonly Field = expenseCategoryQueryField;
  static readonly Filter = expenseCategoryQueryFilter;
}
