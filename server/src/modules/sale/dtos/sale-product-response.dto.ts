import { BaseResponseDto } from '@/libs/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { SaleProduct } from '@prisma/client';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

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
  @Min(1)
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  costPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  sellingPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  tax: number;
}
