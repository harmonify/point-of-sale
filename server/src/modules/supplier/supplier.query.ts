import { Prisma } from '@prisma/client';

const supplierQueryField: Record<string, () => Prisma.SupplierSelectScalar> =
  {} satisfies Record<string, () => Prisma.SupplierSelectScalar>;

const supplierQueryFilter = {
  search: (term: string) =>
    ({
      OR: [
        { name: { contains: term } },
        { email: { contains: term } },
        { phoneNumber: { contains: term } },
      ],
    }) satisfies Prisma.SupplierWhereInput,
} satisfies Record<string, (...args: any) => Prisma.SupplierWhereInput>;

export class SupplierQuery {
  static readonly Field = supplierQueryField;
  static readonly Filter = supplierQueryFilter;
}
