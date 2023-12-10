import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
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
  customerId: number | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string | null;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  discountOnTotal: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  taxOnTotal: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  billAmount: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  netAmount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleProductRequestDto)
  saleProducts: CreateSaleProductRequestDto[];
}
