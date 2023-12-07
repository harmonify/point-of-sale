import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNotificationRequestDto
  implements Prisma.NotificationUncheckedCreateInput
{
  @IsInt()
  @ApiProperty({
    description: 'The target user',
  })
  userId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The notification title',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The notification description',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The notification target URL when it is clicked',
    default: '#',
  })
  url?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'The notification source',
    default: 'system',
  })
  source?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Is the notification dismissable?',
    default: true,
  })
  dismissable?: boolean;
}
