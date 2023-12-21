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
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { CreateProcurementProductRequestDto } from './create-procurement-product-request.dto';

export class CreateProcurementRequestDto
  implements
    Omit<
      Prisma.ProcurementCreateInput,
      'createdBy' | 'updatedBy' | 'supplier' | 'procurementProducts'
    >
{
  @IsDefined()
  @IsInt()
  @Min(1)
  @ApiProperty()
  supplierId: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

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
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProcurementProductRequestDto)
  @ApiProperty({ type: () => CreateProcurementProductRequestDto })
  procurementProducts: CreateProcurementProductRequestDto[];
}
