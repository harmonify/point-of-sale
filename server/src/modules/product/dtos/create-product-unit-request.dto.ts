import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsDefined, IsInt, IsNumber } from 'class-validator';

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
  price: number;
}
