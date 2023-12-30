import { ApiProperty } from '@nestjs/swagger';
import {
  Prisma,
  ProcurementDeliveryStatus,
  ProcurementPaymentStatus,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsDefined,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { UpdateProcurementProductRequestDto } from './update-procurement-product-request.dto';

export class UpdateProcurementRequestDto
  implements
    Omit<
      Prisma.ProcurementUpdateInput,
      'createdBy' | 'updatedBy' | 'supplier' | 'procurementProducts'
    >
{
  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  invoiceNumber?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  invoiceDate?: string | Date | null;

  @IsDefined()
  @IsEnum(ProcurementDeliveryStatus)
  @ApiProperty()
  deliveryStatus: ProcurementDeliveryStatus;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  deliveredAt?: string | Date | null;

  @IsDefined()
  @IsEnum(ProcurementPaymentStatus)
  @ApiProperty()
  paymentStatus: ProcurementPaymentStatus;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  payedAt?: string | Date | null;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  supplierId: number;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateProcurementProductRequestDto)
  @ApiProperty({ type: () => UpdateProcurementProductRequestDto })
  procurementProducts: UpdateProcurementProductRequestDto[];
}
