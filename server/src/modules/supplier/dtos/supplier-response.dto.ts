import { ApiProperty } from '@nestjs/swagger';
import { Supplier } from '@prisma/client';

export class SupplierResponseDto implements Partial<Supplier> {
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
  phoneNumber: string;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  description?: string | null;

  @ApiProperty()
  address: string | null;
}
