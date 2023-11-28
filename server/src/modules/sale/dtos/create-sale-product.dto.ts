import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSaleProductRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  costPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  sellingPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  productId: number;
}
