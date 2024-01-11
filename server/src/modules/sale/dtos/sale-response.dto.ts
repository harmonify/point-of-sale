import { ApiProperty } from '@nestjs/swagger';
import { FlatOrPercentage, Sale } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { SaleProductResponseDto } from './sale-product-response.dto';
import { UserResponseDto } from '@/modules/user';
import { CustomerResponseDto } from '@/modules/customer';

export class SaleResponseDto
  implements Omit<Sale, 'createdAt' | 'updatedAt' | 'deletedAt'>
{
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
  invoiceNumber: string;

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
  subTotal: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  inputDiscountTotal: number;

  @IsOptional()
  @IsEnum(FlatOrPercentage)
  @ApiProperty()
  discountTotalType: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  discountTotal: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  inputTaxTotal: number;

  @IsOptional()
  @IsEnum(FlatOrPercentage)
  @ApiProperty()
  taxTotalType: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  taxTotal: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  total: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  paid: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  change: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleProductResponseDto)
  @ApiProperty()
  saleProducts: SaleProductResponseDto[];

  @ApiProperty()
  customer: CustomerResponseDto | null;

  @ApiProperty()
  createdBy: Pick<UserResponseDto, 'name'>;
}
