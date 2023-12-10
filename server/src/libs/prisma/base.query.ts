import type { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { IPrismaBaseFields } from './interfaces';
import _ from 'lodash';

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
    authorId: number,
  ) {
    return {
      upsert: data.map((d) => ({
        create: { ...d, createdById: authorId, updatedById: authorId },
        update: { ...d, updatedById: authorId },
        where: { id: d.id },
      })),
    };
  }

  static softDelete(authorId?: number) {
    return { deletedAt: DateTime.now().toJSDate(), deletedById: authorId };
  }

  static async partitionQuery<T>(
    dto: T[],
    queryFn: (subDto: T) => Promise<T>,
  ): Promise<T[]> {
    if (dto.length === 0) {
      return [];
    }

    const clonedDto = _.clone(dto);
    const BATCH_PER_QUERY = 10;
    const result = [];
    while (clonedDto.length > 0) {
      result.push(
        ...(await Promise.all(
          clonedDto.splice(0, BATCH_PER_QUERY).map(queryFn),
        )),
      );
    }

    return result;
  }
}
