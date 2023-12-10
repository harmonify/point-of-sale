import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateSaleProductRequestDto
  implements
    Omit<
      Prisma.SaleProductCreateInput,
      'createdBy' | 'updatedBy' | 'sale' | 'productUnit'
    >
{
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  saleId: number;

  @IsNotEmpty()
  @IsNumber()
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

  @IsDefined()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  tax: number;
}
