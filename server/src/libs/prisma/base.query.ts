import type { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { IPrismaBaseFields } from './interfaces';

const baseQueryField = {
  default: () =>
    ({
      id: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }) satisfies Prisma.UserSelectScalar,
} satisfies Record<string, () => Prisma.UserSelectScalar>;

const baseQueryFilter = {
  available: () => ({ deletedAt: null }) satisfies Prisma.UserWhereInput,
  isActive: () =>
    ({ isActive: true, deletedAt: null }) satisfies Prisma.UserWhereInput,
  byId: (id: number) => ({ id }) satisfies Prisma.UserWhereInput,
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

  static nestedUpsertMany<T extends Record<any, any>>(
    data: T[],
    userId: number,
  ) {
    return {
      upsert: data.map((d) => ({
        create: { ...d, createdById: userId, updatedById: userId },
        update: { ...d, updatedById: userId },
        where: { id: d.id },
      })),
    };
  }

  static softDelete(userId?: number) {
    return { deletedAt: DateTime.now().toJSDate(), deletedById: userId };
  }
}
