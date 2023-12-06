import { faker } from '@faker-js/faker';
import { Prisma, ProductCategory } from '@prisma/client';
import { DateTime } from 'luxon';

import { testUser } from './user';

export const productCategory: ProductCategory = {
  id: 1,
  isActive: true,
  name: faker.lorem.words() + ' ' + DateTime.now().toUnixInteger(),
  description: 'What a productCategory',
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};

export const mockProductCategory: Partial<ProductCategory> = {
  id: 2,
  isActive: true,
  name: faker.lorem.words() + ' ' + DateTime.now().toUnixInteger(),
  description: 'What a productCategory',
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
};
