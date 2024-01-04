import { ApiProperty } from '@nestjs/swagger';
import { FlatOrPercentage, Prisma } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateSaleProductRequestDto
  implements
    Omit<
      Prisma.SaleProductCreateInput,
      'createdBy' | 'updatedBy' | 'sale' | 'productUnit' | 'costPrice'
    >
{
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  productUnitId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  salePrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  quantity: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  subTotal?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  inputDiscount?: number;

  @IsOptional()
  @IsEnum(FlatOrPercentage)
  @ApiProperty()
  discountType?: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  discount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  inputTax?: number;

  @IsOptional()
  @IsEnum(FlatOrPercentage)
  @ApiProperty()
  taxType?: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  tax?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  total?: number;
}
