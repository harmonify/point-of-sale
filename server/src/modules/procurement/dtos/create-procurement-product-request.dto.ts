import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsDefined, IsInt, IsNumber, Min } from 'class-validator';

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

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  quantity: number;
}
