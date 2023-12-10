import { Prisma } from '@prisma/client';

const unitQueryField = {} satisfies Record<
  string,
  () => Prisma.UnitSelectScalar
>;

const unitQueryFilter = {
  search: (term: string) =>
    ({
      OR: [
        { name: { contains: term } },
        { description: { contains: term } },
        { createdBy: { name: { contains: term } } },
      ],
    }) satisfies Prisma.UnitWhereInput,
} satisfies Record<string, (...args: any[]) => Prisma.UnitWhereInput>;

export class UnitQuery {
  static readonly Field = unitQueryField;
  static readonly Filter = unitQueryFilter;
}
