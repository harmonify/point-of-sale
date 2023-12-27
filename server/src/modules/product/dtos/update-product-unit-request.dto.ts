import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsDefined, IsInt, IsNumber, IsOptional } from 'class-validator';

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
  price: number;
}
