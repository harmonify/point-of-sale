import { BaseResponseDto } from '@/libs/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { Unit } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
} from 'class-validator';

export class UnitResponseDto extends BaseResponseDto implements Unit {
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

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  amount: number;
}
