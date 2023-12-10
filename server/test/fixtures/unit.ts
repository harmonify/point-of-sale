import { Unit } from '@prisma/client';
import { DateTime } from 'luxon';
import { testUser } from './user';

export const pieceUnit: Unit = {
  id: 1,
  isActive: true,
  name: 'Piece',
  description: 'What a piece',
  amount: 1,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};

export const dozenUnit: Unit = {
  id: 2,
  isActive: true,
  name: 'Dozen',
  description: 'What a dozen',
  amount: 12,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};

export const mockUnit: Unit = {
  id: 3,
  isActive: true,
  name: 'Mock unit',
  description: 'What a mock unit',
  amount: 100,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};
