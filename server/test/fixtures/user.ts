import 'tsconfig-paths/register';
import { HashUtil } from '@/common/utils';
import { Prisma, User } from '@prisma/client';
import csprng from 'csprng';
import { DateTime } from 'luxon';

export const adminUser: User = {
  id: 1,
  email: 'admin@example.com',
  name: 'Admin User',
  phoneNumber: '12345678901',
  blockReason: null,
  password: process.env.DEFAULT_USER_PASSWORD || 'Qwerty12345678',
  isActive: true,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: null,
  updatedById: null,
  deletedById: null,
};

export const testUser: User = Object.freeze({
  id: 2,
  email: 'test@example.com',
  name: 'Test User',
  phoneNumber: '12345678902',
  blockReason: null,
  password: process.env.DEFAULT_USER_PASSWORD || 'Qwerty12345678',
  isActive: true,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: null,
  updatedById: null,
  deletedById: null,
});
