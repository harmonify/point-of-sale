import { BaseResponseDto } from '@/libs/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { Unit } from '@prisma/client';

export class UnitResponseDto extends BaseResponseDto implements Unit {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  amount: number;
}
