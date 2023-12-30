import { ApiProperty } from '@nestjs/swagger';
import { ProductUnitResponseDto } from './product-unit-response.dto';
import { UnitResponseDto } from '@/modules/unit';

export class ProductUnitInfoResponseDto extends ProductUnitResponseDto {
  @ApiProperty()
  unit: Pick<UnitResponseDto, 'name'>;

  @ApiProperty()
  availableQuantity: number;
}
