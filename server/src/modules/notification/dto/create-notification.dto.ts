import { Prisma } from '@prisma/client';

export class CreateNotificationRequestDto
  implements Prisma.NotificationCreateInput
{
  deletedAt?: Date;
  userId: number;
  identifier: string;
  name: string;
  description?: string;
}
