import { ApiProperty } from '@nestjs/swagger';
import { FlatOrPercentage, Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { UpdateSaleProductRequestDto } from './update-sale-product.dto';

export class UpdateSaleRequestDto
  implements
    Omit<Prisma.SaleUpdateInput, 'createdBy' | 'updatedBy' | 'saleProducts'>
{
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty()
  customerId?: number | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  subTotal?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  inputDiscountTotal?: number;

  @IsOptional()
  @IsEnum(FlatOrPercentage)
  @ApiProperty()
  discountTotalType?: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  discountTotal?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  inputTaxTotal?: number;

  @IsOptional()
  @IsEnum(FlatOrPercentage)
  @ApiProperty()
  taxTotalType?: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  taxTotal?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  total?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  paid?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  change?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSaleProductRequestDto)
  saleProducts: UpdateSaleProductRequestDto[];
}
