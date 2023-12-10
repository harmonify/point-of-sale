import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExpenseRequestDto
  implements Omit<Prisma.ExpenseUpdateInput, 'createdBy' | 'updatedBy'>
{
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  amount?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  expenseCategoryId?: number;
}
