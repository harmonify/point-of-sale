import { Prisma } from '@prisma/client';
import { IPrismaBaseFields } from '@/libs/prisma';

const customerQueryField = {
  default: () => ({
    name: true,
    address: true,
    description: true,
    email: true,
    gender: true,
    phoneNumber: true,
  }),
} satisfies Record<
  string,
  () => Omit<Prisma.CustomerSelectScalar, keyof IPrismaBaseFields>
>;

const customerQueryFilter = {
  search: (term: string) => ({
    OR: [
      { name: { contains: term } },
      { email: { contains: term } },
      { phoneNumber: { contains: term } },
    ],
  }),
} satisfies Record<
  string,
  (...args: any) => Prisma.CustomerWhereInput | Prisma.CustomerWhereInput[]
>;

export class CustomerQuery {
  static readonly Field = customerQueryField;
  static readonly Filter = customerQueryFilter;
}
