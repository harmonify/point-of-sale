import { Prisma } from '@prisma/client';

const providerQueryField: Record<string, () => Prisma.ProviderSelectScalar> =
  {} satisfies Record<string, () => Prisma.ProviderSelectScalar>;

const providerQueryFilter = {
  search: (term: string) =>
    ({
      OR: [
        { name: { contains: term } },
        { email: { contains: term } },
        { phoneNumber: { contains: term } },
      ],
    }) satisfies Prisma.ProviderWhereInput,
} satisfies Record<string, (...args: any) => Prisma.ProviderWhereInput>;

export class ProviderQuery {
  static readonly Field = providerQueryField;
  static readonly Filter = providerQueryFilter;
}
