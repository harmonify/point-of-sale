import { BaseQuery } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

const customerQueryField = {} satisfies Record<
  string,
  () => Prisma.CustomerSelectScalar
>;

const customerQueryFilter = {
  search: (term: string) =>
    ({
      OR: [
        { name: { contains: term } },
        { email: { contains: term } },
        { phoneNumber: { contains: term } },
      ],
    }) satisfies Prisma.CustomerWhereInput,
} satisfies Record<string, (...args: any[]) => Prisma.CustomerWhereInput>;

export class CustomerQuery {
  static readonly Field = customerQueryField;
  static readonly Filter = customerQueryFilter;
}
