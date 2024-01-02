import { BaseResponseDto } from '@/libs/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { FlatOrPercentage, SaleProduct } from '@prisma/client';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class SaleProductResponseDto
  extends BaseResponseDto
  implements SaleProduct
{
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty()
  saleId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty()
  productUnitId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  quantity: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  subTotal: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  inputDiscount: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  discountType: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  discount: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  inputTax: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  taxType: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  tax: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  total: number;
}
