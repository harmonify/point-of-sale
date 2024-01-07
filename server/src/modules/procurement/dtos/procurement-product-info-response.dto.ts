import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt } from 'class-validator';

import { ProcurementProductResponseDto } from './procurement-product-response.dto';

export class ProcurementProductInfoResponseDto extends ProcurementProductResponseDto {
  @IsDefined()
  @IsInt()
  @ApiProperty()
  productId: number;
}
