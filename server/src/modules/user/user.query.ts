import { Prisma } from '@prisma/client';
import { BaseQuery } from '@/libs/prisma';

const userQueryField = {
  default: () =>
    ({
      ...BaseQuery.Field.default(),
      name: true,
      email: true,
      phoneNumber: true,
      blockReason: true,
    }) satisfies Prisma.UserSelectScalar,
} satisfies Record<string, () => Prisma.UserSelectScalar>;

const userQueryFilter = {
  search: (term: string) =>
    ({
      OR: [
        { name: { contains: term } },
        { email: { contains: term } },
        { phoneNumber: { contains: term } },
      ],
    }) satisfies Prisma.UserWhereInput,
} satisfies Record<string, (...args: any) => Prisma.UserWhereInput>;

export class UserQuery {
  static readonly Field = userQueryField;
  static readonly Filter = userQueryFilter;
}
