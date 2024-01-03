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

import { CreateSaleProductRequestDto } from './create-sale-product.dto';

export class CreateSaleRequestDto
  implements
    Omit<Prisma.SaleCreateInput, 'createdBy' | 'updatedBy' | 'saleProducts'>
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
  @ApiProperty()
  subTotal?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  inputDiscountTotal?: number;

  @IsOptional()
  @IsEnum(FlatOrPercentage)
  @ApiProperty()
  discountTotalType?: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  discountTotal?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  inputTaxTotal?: number;

  @IsOptional()
  @IsEnum(FlatOrPercentage)
  @ApiProperty()
  taxTotalType?: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  taxTotal?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  total?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  paid?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  change?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleProductRequestDto)
  saleProducts: CreateSaleProductRequestDto[];
}
