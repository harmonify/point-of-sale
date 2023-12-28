import { BarcodeType, Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@/modules/user';
import { CategoryResponseDto } from '@/modules/category';
import { ProductUnitInfoResponseDto } from './product-unit-info-response.dto';

class ProductDto implements Product {
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
  categoryId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  barcode: string | null;

  @ApiProperty({ enum: BarcodeType })
  barcodeType: BarcodeType | null;
}

export class ProductResponseDto extends ProductDto {
  @ApiProperty()
  category: CategoryResponseDto | null;

  @ApiProperty()
  productUnits: ProductUnitInfoResponseDto[];

  @ApiProperty()
  createdBy: Pick<UserResponseDto, 'name'>;
}
