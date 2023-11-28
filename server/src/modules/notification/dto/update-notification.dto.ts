import { Prisma } from '@prisma/client';

export class UpdateNotificationRequestDto
  implements Prisma.NotificationUpdateInput
{
  deletedAt?: Date;
  userId?: number;
  identifier?: string;
  name?: string;
  description?: string;
}
