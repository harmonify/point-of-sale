import { Prisma } from '@prisma/client';

const expenseQueryField = {} satisfies Record<
  string,
  () => Prisma.ExpenseSelectScalar
>;

const expenseQueryFilter = {
  search: (term: string) => {
    const query: Prisma.ExpenseWhereInput = {
      OR: [{ name: { contains: term } }, { description: { contains: term } }],
    };
    const amount = parseFloat(term);
    if (!Number.isNaN(amount)) {
      (query.OR as Prisma.ExpenseWhereInput[]).push({
        amount: { equals: amount },
      });
    }
    return query satisfies Prisma.ExpenseWhereInput;
  },
} satisfies Record<string, (...args: any[]) => Prisma.ExpenseWhereInput>;

export class ExpenseQuery {
  static readonly Field = expenseQueryField;
  static readonly Filter = expenseQueryFilter;
}
