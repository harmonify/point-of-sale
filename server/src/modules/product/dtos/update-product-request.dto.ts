import { BarcodeType, Product } from '@prisma/client';
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
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductUnitRequestDto } from './update-product-unit-request.dto';
import { IPrismaBaseFields } from '@/libs/prisma';

export class UpdateProductRequestDto
  implements Omit<Product, IPrismaBaseFields | 'productUnits'>
{
  @IsDefined()
  @IsInt()
  @ApiProperty()
  categoryId: number;

  @IsDefined()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  barcode: string | null;

  @IsOptional()
  @IsEnum(BarcodeType)
  @ApiProperty({ enum: BarcodeType })
  barcodeType: BarcodeType | null;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateProductUnitRequestDto)
  @ApiProperty({ type: () => UpdateProductUnitRequestDto })
  productUnits: UpdateProductUnitRequestDto[];
}
