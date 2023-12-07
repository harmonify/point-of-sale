import { faker } from '@faker-js/faker';
import { Category } from '@prisma/client';
import { DateTime } from 'luxon';

import { testUser } from './user';

export const category: Category = {
  id: 1,
  isActive: true,
  name: faker.lorem.words() + ' ' + DateTime.now().toUnixInteger(),
  description: 'What a category',
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};

export const mockCategory: Partial<Category> = {
  id: 2,
  isActive: true,
  name: faker.lorem.words() + ' ' + DateTime.now().toUnixInteger(),
  description: 'What a category',
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
};
