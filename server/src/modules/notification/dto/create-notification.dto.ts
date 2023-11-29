import { Prisma } from '@prisma/client';

export class CreateNotificationRequestDto
  implements Partial<Prisma.NotificationCreateInput>
{
  deletedAt?: Date;
  userId: number;
  identifier: string;
  name: string;
  description?: string;
}
