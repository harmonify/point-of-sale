import { ProcurementProductInfoResponseDto } from './procurement-product-info-response.dto';
import { ProcurementResponseDto } from './procurement-response.dto';

export class ProcurementInfoResponseDto extends ProcurementResponseDto {
  procurementProducts: ProcurementProductInfoResponseDto[];
}
