import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUnitRequestDto
  implements Omit<Prisma.UnitCreateInput, 'createdBy' | 'updatedBy'>
{
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
  description: string | null;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  amount: number;
}
