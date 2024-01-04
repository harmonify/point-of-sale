import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

import { CreateSaleProductRequestDto } from './create-sale-product.dto';

export class UpdateSaleProductRequestDto extends CreateSaleProductRequestDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  id?: number;
}
