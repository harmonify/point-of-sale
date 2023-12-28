import { ApiProperty } from '@nestjs/swagger';
import { ProductUnitResponseDto } from './product-unit-response.dto';

export class ProductUnitInfoResponseDto extends ProductUnitResponseDto {
  @ApiProperty()
  availableQuantity: number;
}
