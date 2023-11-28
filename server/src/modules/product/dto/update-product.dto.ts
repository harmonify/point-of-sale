import { BarcodeType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductRequestDto {
  deletedAt?: Date;
  deletedById?: number;
  name?: string;
  description?: string;
  barcode?: string;
  @ApiProperty({ enum: BarcodeType })
  barcodeType?: BarcodeType;
}
