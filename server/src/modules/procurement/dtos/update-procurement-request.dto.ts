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
  IsEnum,
  IsInt,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateProcurementProductRequestDto } from './update-procurement-product-request.dto';

export class UpdateProcurementRequestDto
  implements
    Omit<
      Prisma.ProcurementUpdateInput,
      'createdBy' | 'updatedBy' | 'provider' | 'procurementProducts'
    >
{
  @IsDefined()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  description: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  invoiceNumber: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  invoiceDate: string | Date;

  @IsDefined()
  @IsEnum(ProcurementDeliveryStatus)
  @ApiProperty()
  deliveryStatus: ProcurementDeliveryStatus;

  @IsDefined()
  @IsDateString()
  @ApiProperty()
  deliveredAt: string | Date;

  @IsDefined()
  @IsEnum(ProcurementPaymentStatus)
  @ApiProperty()
  paymentStatus: ProcurementPaymentStatus;

  @IsDefined()
  @IsDateString()
  @ApiProperty()
  payedAt: string | Date;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  providerId: number;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateProcurementProductRequestDto)
  @ApiProperty({ type: () => UpdateProcurementProductRequestDto })
  procurementProducts: UpdateProcurementProductRequestDto[];
}
