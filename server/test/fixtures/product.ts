import { faker } from '@faker-js/faker';
import { Prisma, Product } from '@prisma/client';
import { DateTime } from 'luxon';

import { testUser } from './user';

export const product: Product = {
  id: 1,
  isActive: true,
  name: faker.lorem.words() + ' ' + DateTime.now().toUnixInteger(),
  description: 'What a product',
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};

export const mockProduct: Partial<Product> = {
  id: 2,
  isActive: true,
  name: faker.lorem.words() + ' ' + DateTime.now().toUnixInteger(),
  description: 'What a product',
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
};
