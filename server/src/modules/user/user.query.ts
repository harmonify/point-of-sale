import { Prisma } from '@prisma/client';
import { IPrismaBaseFields } from '@/libs/prisma';
import { BaseQuery } from '@/libs/prisma';

const userQueryField = {
  default: () => ({
    ...BaseQuery.Field.default(),
    name: true,
    email: true,
    phoneNumber: true,
    blockReason: true,
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
