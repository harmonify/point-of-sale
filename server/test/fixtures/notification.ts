import { faker } from '@faker-js/faker';
import { Notification } from '@prisma/client';
import { DateTime } from 'luxon';
import { testUser } from './user';

/** Test user notification. */
export const notification: Readonly<Notification> = {
  id: '65a80cde-f8f9-41c7-a8c9-417fa68cda22',
  userId: testUser.id,
  name: faker.lorem.words(),
  description: 'What a notification',
  url: '#',
  source: 'system',
  dismissable: true,
  isActive: true,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
};
