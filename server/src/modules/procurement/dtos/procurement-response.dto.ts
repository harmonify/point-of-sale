import { ApiProperty } from '@nestjs/swagger';
import {
  Procurement,
  ProcurementDeliveryStatus,
  ProcurementPaymentStatus,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProcurementProductResponseDto } from './procurement-product-response.dto';

export class ProcurementResponseDto implements Procurement {
  @IsDefined()
  @IsInt()
  @ApiProperty()
  id: number;

  @IsDefined()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsDefined()
  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDefined()
  @IsDate()
  @ApiProperty()
  updatedAt: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  deletedAt: Date | null;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  createdById: number;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  updatedById: number;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  deletedById: number | null;

  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  invoiceNumber: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  invoiceDate: Date | null;

  @IsDefined()
  @IsEnum(ProcurementDeliveryStatus)
  @ApiProperty()
  deliveryStatus: ProcurementDeliveryStatus;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  deliveredAt: Date | null;

  @IsDefined()
  @IsEnum(ProcurementPaymentStatus)
  @ApiProperty()
  paymentStatus: ProcurementPaymentStatus;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  payedAt: Date | null;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  providerId: number;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProcurementProductResponseDto)
  @ApiProperty({ type: () => ProcurementProductResponseDto })
  procurementProducts: ProcurementProductResponseDto[];
}
