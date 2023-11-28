import { Prisma } from '@prisma/client';
import { IPrismaBaseFields } from '@/libs/prisma';

const userQueryField = {
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
  () => Omit<Prisma.UserSelectScalar, keyof IPrismaBaseFields>
>;

const userQueryFilter = {
  search: (term: string) => ({
    OR: [
      { name: { contains: term } },
      { email: { contains: term } },
      { phoneNumber: { contains: term } },
    ],
  }),
} satisfies Record<
  string,
  (...args: any) => Prisma.UserWhereInput | Prisma.UserWhereInput[]
>;

export class UserQuery {
  static readonly Field = userQueryField;
  static readonly Filter = userQueryFilter;
}
