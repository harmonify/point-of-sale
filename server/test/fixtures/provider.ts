import { Provider } from '@prisma/client';
import csprng from 'csprng';
import { testUser } from './user';
import { DateTime } from 'luxon';

export const provider: Provider = {
  id: 1,
  isActive: true,
  name: 'Provider 1',
  phoneNumber: csprng(32, 10),
  email: `provider+${csprng(160, 36)}@example.com`,
  description: 'What a provider',
  address: 'Earth Provider',
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};
