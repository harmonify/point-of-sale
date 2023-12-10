import { ApiProperty } from '@nestjs/swagger';
import { ProductUnit } from '@prisma/client';

export class ProductUnitResponseDto implements ProductUnit {
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
  productId: number;

  @ApiProperty()
  unitId: number;

  @ApiProperty()
  wholesalePrice: number;

  @ApiProperty()
  sellingPrice: number;

  @ApiProperty()
  stockAlertEnabled: boolean | null;

  @ApiProperty()
  lowQuantity: number | null;
}
