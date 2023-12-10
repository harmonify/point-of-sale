import { Prisma } from '@prisma/client';

const productQueryField = {} satisfies Record<
  string,
  () => Prisma.ProductSelect
>;

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
