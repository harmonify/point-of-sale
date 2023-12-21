import { Supplier } from '@prisma/client';
import csprng from 'csprng';
import { testUser } from './user';
import { DateTime } from 'luxon';

export const supplier: Supplier = {
  id: 1,
  isActive: true,
  name: 'supplier 1',
  phoneNumber: csprng(32, 10),
  email: `supplier+${csprng(160, 36)}@example.com`,
  description: 'What a supplier',
  address: 'Earth supplier',
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};
