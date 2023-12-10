import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsDefined, IsInt, IsNumber, Min } from 'class-validator';

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

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  id?: number;

  @IsDefined()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsDefined()
  @IsInt()
  @ApiProperty()
  quantity: number;
}
