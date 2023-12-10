import { Prisma } from '@prisma/client';

const saleQueryField = {} satisfies Record<
  string,
  () => Prisma.SaleSelectScalar
>;

const saleQueryFilter = {
  search: (term: string) =>
    ({
      OR: [
        { description: { contains: term } },
        { customer: { name: { contains: term } } },
        { createdBy: { name: { contains: term } } },
      ],
    }) satisfies Prisma.SaleWhereInput,
} satisfies Record<string, (...args: any[]) => Prisma.SaleWhereInput>;

export class SaleQuery {
  static readonly Field = saleQueryField;
  static readonly Filter = saleQueryFilter;
}
