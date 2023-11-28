import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';

import { CreateSaleProductRequestDto } from './create-sale-product.dto';

export class CreateSaleRequestDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalDiscount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleProductRequestDto)
  saleProducts: CreateSaleProductRequestDto[];

  @IsOptional()
  @IsNumber()
  customerId?: string;

  @IsOptional()
  @IsNumber()
  discountOnItems: number;

  @IsOptional()
  @IsNumber()
  discountOnTotal: number;

  @IsOptional()
  @IsNumber()
  tax: number;

  @IsOptional()
  @IsNumber()
  taxPercentageString?: string;

  @IsOptional()
  @IsNumber()
  netAmount: number;

  @IsOptional()
  @IsNumber()
  amountPaid: number;

  @IsOptional()
  @IsNumber()
  comments?: string;
}
