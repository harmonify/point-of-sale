import { ApiProperty } from '@nestjs/swagger';
import { Notification } from '@prisma/client';

export class NotificationResponseDto implements Partial<Notification> {
  @ApiProperty()
  id: string;

  @ApiProperty({
    description: 'Whether the notification is dismissed or not',
  })
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    description: 'Whether the record is disabled/soft deleted',
  })
  deletedAt?: Date | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string | null;

  @ApiProperty()
  url: string;

  @ApiProperty()
  source: string;

  @ApiProperty()
  dismissable: boolean;
}
