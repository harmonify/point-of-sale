import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
} from 'class-validator';

export class BaseResponseDto {
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
}
