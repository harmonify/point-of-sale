import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserResponseDto implements Partial<User> {
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
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  blockReason: string | null;

  constructor(dto?: Partial<UserResponseDto>) {
    Object.assign(this, dto);
  }
}
