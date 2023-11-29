import { Customer, Gender } from '@prisma/client';
import csprng from 'csprng';
import { testUser } from './user';
import { DateTime } from 'luxon';

export const customer: Customer = {
  id: 1,
  isActive: true,
  name: 'Customer 1',
  gender: Gender.MALE,
  phoneNumber: csprng(32, 10),
  email: `customer+${csprng(160, 36)}@example.com`,
  description: 'What a customer',
  address: 'Earth',
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};
