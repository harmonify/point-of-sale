import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseRequestDto
  implements
    Omit<
      Prisma.ExpenseCreateInput,
      'createdBy' | 'updatedBy' | 'expenseCategory'
    >
{
  @IsDefined()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsDefined()
  @IsBoolean()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string | null;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  expenseCategoryId: number;
}
