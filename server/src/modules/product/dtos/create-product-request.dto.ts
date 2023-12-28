import { BarcodeType, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateProductUnitRequestDto } from './create-product-unit-request.dto';
import { Type } from 'class-transformer';

export class CreateProductRequestDto
  implements
    Omit<
      Prisma.ProductCreateInput,
      'createdBy' | 'updatedBy' | 'category' | 'productUnits'
    >
{
  @IsDefined()
  @IsInt()
  @Min(1)
  @ApiProperty()
  categoryId: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  barcode?: string | null;

  @IsOptional()
  @IsEnum(BarcodeType)
  @ApiProperty({ enum: BarcodeType })
  barcodeType?: BarcodeType | null;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProductUnitRequestDto)
  @ApiProperty({ type: () => CreateProductUnitRequestDto })
  productUnits: CreateProductUnitRequestDto[];
}
