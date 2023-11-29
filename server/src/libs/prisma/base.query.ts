import type { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

const baseQueryField = {
  default: () => ({
    id: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  }),
} satisfies Record<string, () => Prisma.UserSelectScalar>;

const baseQueryFilter = {
  available: () => ({ deletedAt: null }),
  isActive: () => ({ isActive: true, deletedAt: null }),
  byId: (id: number) => ({ id }),
} satisfies Record<string, (...args: any) => Prisma.UserWhereInput>;

const baseQueryOrderBy = {
  latest: () => ({ createdAt: 'desc' }),
} satisfies Record<
  string,
  (...args: any) => Prisma.UserOrderByWithRelationInput
>;

export class BaseQuery {
  static readonly Field = baseQueryField;

  static readonly Filter = baseQueryFilter;

  static readonly OrderBy = baseQueryOrderBy;

  static getSoftDeleteData(deletedById?: number) {
    return { deletedAt: DateTime.now().toJSDate(), deletedById };
  }
}
