import type { Prisma } from '@prisma/client';

export type IPrismaBaseFields = Pick<
  Prisma.UserSelectScalar,
  'id' | 'isActive' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
