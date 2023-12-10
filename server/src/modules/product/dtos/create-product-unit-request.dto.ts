import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProductUnitRequestDto
  implements
    Omit<
      Prisma.ProductUnitCreateManyProductInput,
      'createdById' | 'updatedById'
    >
{
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
