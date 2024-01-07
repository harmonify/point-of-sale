import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsDefined, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateProcurementProductRequestDto
  implements
    Omit<
      Prisma.ProcurementProductUncheckedCreateWithoutProcurementInput,
      'createdById' | 'updatedById'
    >
{
  @IsDefined()
  @IsInt()
  @Min(1)
  @ApiProperty()
  productUnitId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id?: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  quantity: number;
}
