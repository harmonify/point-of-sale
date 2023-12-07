import { BarcodeType, Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@/modules/user';
import { CategoryResponseDto } from '@/modules/category';
import { ProductUnitResponseDto } from './product-unit-response.dto';

class ProductDto implements Partial<Product> {
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
  barcode: string | null;

  @ApiProperty({ enum: BarcodeType })
  barcodeType: BarcodeType | null;
}

export class ProductResponseDto extends ProductDto {
  @ApiProperty()
  category?: CategoryResponseDto;

  @ApiProperty()
  productUnits: ProductUnitResponseDto[];

  @ApiProperty()
  createdBy: UserResponseDto;
}
