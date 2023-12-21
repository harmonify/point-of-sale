import { Prisma } from '@prisma/client';

const procurementQueryField = {} satisfies Record<
  string,
  () => Prisma.ProcurementSelectScalar
>;

const procurementQueryFilter = {
  search: (term: string) =>
    ({
      OR: [
        { name: { contains: term } },
        { description: { contains: term } },
        { supplier: { name: { contains: term } } },
      ],
    }) satisfies Prisma.ProcurementWhereInput,
} satisfies Record<string, (...args: any[]) => Prisma.ProcurementWhereInput>;

export class ProcurementQuery {
  static readonly Field = procurementQueryField;
  static readonly Filter = procurementQueryFilter;
}
