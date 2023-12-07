import { BarcodeType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateProductRequestDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string | null;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  barcode?: string;

  @IsOptional()
  @IsEnum(BarcodeType)
  @ApiProperty({ enum: BarcodeType })
  barcodeType?: BarcodeType;
}
