import { ApiProperty } from '@nestjs/swagger';
import { ProcurementProduct } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ProcurementProductResponseDto implements ProcurementProduct {
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
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  quantity: number;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  productUnitId: number;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  procurementId: number;
}
