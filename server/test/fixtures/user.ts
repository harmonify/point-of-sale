import 'tsconfig-paths/register';
import { HashUtil } from '@/common/utils';
import { Prisma, User } from '@prisma/client';
import csprng from 'csprng';
import { DateTime } from 'luxon';

/** Admin user. Must not be deleted. */
export const adminUser: Readonly<User> = {
  id: 1,
  email: 'admin@example.com',
  name: 'Admin User',
  phoneNumber: '62812345678901',
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

/** Test user. Used to authenticate in test suite. Must not be deleted. */
export const testUser: Readonly<User> = {
  id: 2,
  email: 'test@example.com',
  name: 'Test User',
  phoneNumber: '62812345678902',
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

/** Mock user. Deletable */
export const mockUser: Readonly<User> = {
  id: 3,
  email: 'mock@example.com',
  name: 'Mock User',
  phoneNumber: '628123456789023',
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
