import { BaseQuery, IPrismaBaseFields } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

const userQueryField = {
  default: () =>
    ({
      ...BaseQuery.Field.default(),
      email: true,
      name: true,
      phoneNumber: true,
    }) satisfies Omit<Prisma.UserSelectScalar, IPrismaBaseFields>,
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
