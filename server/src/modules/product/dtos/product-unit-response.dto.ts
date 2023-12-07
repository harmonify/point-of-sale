import { ApiProperty } from '@nestjs/swagger';
import { ProductUnit } from '@prisma/client';

export class ProductUnitResponseDto implements Partial<ProductUnit> {
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
  description: string | null;

  @ApiProperty()
  wholesalePrice: number;

  @ApiProperty()
  sellingPrice: number;

  @ApiProperty()
  productId: number;
}
