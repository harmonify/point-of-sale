import { ApiProperty } from '@nestjs/swagger';
import { FlatOrPercentage, Prisma } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateSaleProductRequestDto
  implements
    Omit<
      Prisma.SaleProductCreateInput,
      'createdBy' | 'updatedBy' | 'sale' | 'productUnit'
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
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  quantity: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  subTotal?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  inputDiscount?: number;

  @IsOptional()
  @IsEnum(FlatOrPercentage)
  @ApiProperty()
  discountType?: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  discount?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  inputTax?: number;

  @IsOptional()
  @IsEnum(FlatOrPercentage)
  @ApiProperty()
  taxType?: FlatOrPercentage;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  tax?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  total?: number;
}
