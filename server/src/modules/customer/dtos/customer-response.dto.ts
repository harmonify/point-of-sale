import { ApiProperty } from '@nestjs/swagger';
import { Gender, Customer } from '@prisma/client';

export class CustomerResponseDto implements Partial<Customer> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt?: Date | null;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: Gender })
  gender: Gender | null;

  @ApiProperty()
  phoneNumber?: string | null;

  @ApiProperty()
  email?: string | null;

  @ApiProperty()
  description?: string | null;

  @ApiProperty()
  address?: string | null;
}
