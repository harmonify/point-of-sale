import { BaseResponseDto } from '@/libs/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { Sale } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { SaleProductResponseDto } from './sale-product-response.dto';

export class SaleResponseDto extends BaseResponseDto implements Sale {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty()
  customerId: number | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  discountOnTotal: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  taxOnTotal: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  billAmount: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  netAmount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleProductResponseDto)
  @ApiProperty()
  saleProducts: SaleProductResponseDto[];
}
