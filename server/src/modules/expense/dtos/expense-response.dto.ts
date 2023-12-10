import { ApiProperty } from '@nestjs/swagger';
import { Expense } from '@prisma/client';

export class ExpenseResponseDto implements Expense {
  @ApiProperty()
  id: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty()
  createdById: number;

  @ApiProperty()
  updatedById: number;

  @ApiProperty()
  deletedById: number | null;

  @ApiProperty()
  expenseCategoryId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  amount: number;
}
