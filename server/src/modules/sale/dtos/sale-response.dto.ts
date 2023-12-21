import { ApiProperty } from '@nestjs/swagger';
import { Sale } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { SaleProductResponseDto } from './sale-product-response.dto';

export class SaleResponseDto implements Sale {
  @IsDefined()
  @IsInt()
  @ApiProperty()
  id: number;

  @IsDefined()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsDefined()
  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDefined()
  @IsDate()
  @ApiProperty()
  updatedAt: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  deletedAt: Date | null;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  createdById: number;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  updatedById: number;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  deletedById: number | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty()
  customerId: number | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  note: string | null;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isNoteVisible: boolean;

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
