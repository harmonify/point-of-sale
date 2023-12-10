import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateProductUnitRequestDto
  implements
    Omit<
      Prisma.ProductUnitUncheckedCreateWithoutProductInput,
      'createdById' | 'updatedById'
    >
{
  @IsOptional()
  @IsInt()
  @ApiProperty()
  id?: number;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  unitId: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  wholesalePrice: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  sellingPrice: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  lowQuantity: number | null;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  stockAlertEnabled: boolean | null;
}
