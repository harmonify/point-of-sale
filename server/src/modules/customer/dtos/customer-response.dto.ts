import { UserResponseDto } from '@/modules/user';
import { ApiProperty } from '@nestjs/swagger';
import { Customer, Gender } from '@prisma/client';

export class CustomerResponseDto implements Customer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty()
  createdById: number;

  @ApiProperty()
  updatedById: number;

  @ApiProperty()
  deletedById: number | null;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: Gender })
  gender: Gender | null;

  @ApiProperty()
  phoneNumber: string | null;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  address: string | null;
}
