import { SaleProduct } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNumber,
  Min,
  IsNotEmpty,
  IsOptional,
  IsObject,
  ValidateNested,
  IsDefined,
} from 'class-validator';

export class CreateSaleProductDto {
  @IsDefined()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  costPrice: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  sellingPrice: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  discount: number;

  @IsDefined()
  @IsNumber()
  @Min(1)
  productId: number;
}

export class CreateSaleDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalDiscount: number;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleProductDto)
  saleProducts: CreateSaleProductDto;

  @IsOptional()
  @IsNumber()
  customerId?: string;
}
