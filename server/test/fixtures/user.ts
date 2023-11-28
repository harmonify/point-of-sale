import { HashUtil } from '@/common/utils';
import { User } from '@prisma/client';
import csprng from 'csprng';
import { DateTime } from 'luxon';

export const testUser: User = {
  id: 2,
  email: 'test@example.com',
  name: 'Test User',
  phoneNumber: '1234567890',
  blockReason: null,
  password: HashUtil.encryptSync(process.env.TEST_PASSWORD || csprng(160, 36)),
  isActive: true,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: null,
  updatedById: null,
  deletedById: null,
};
