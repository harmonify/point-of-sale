import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateProcurementProductRequestDto
  implements
    Omit<
      Prisma.ProcurementProductCreateManyProcurementInput,
      'createdById' | 'updatedById'
    >
{
  @IsDefined()
  @IsInt()
  @Min(1)
  @ApiProperty()
  productUnitId: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  quantity: number;
}
