import { BaseQuery } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

import type { IPrismaBaseFields } from '@/libs/prisma';

const providerQueryField = {
  default: () => ({
    ...BaseQuery.Field.default(),
    name: true,
    address: true,
    description: true,
    email: true,
    phoneNumber: true,
  }),
} satisfies Record<
  string,
  () => Omit<Prisma.ProviderSelectScalar, keyof IPrismaBaseFields>
>;

const providerQueryFilter = {
  search: (term: string) => ({
    OR: [
      { name: { contains: term } },
      { email: { contains: term } },
      { phoneNumber: { contains: term } },
    ],
  }),
} satisfies Record<
  string,
  (...args: any) => Prisma.ProviderWhereInput | Prisma.ProviderWhereInput[]
>;

export class ProviderQuery {
  static readonly Field = providerQueryField;
  static readonly Filter = providerQueryFilter;
}
