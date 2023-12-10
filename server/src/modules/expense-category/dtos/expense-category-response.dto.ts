import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory, CashFlowOperation } from '@prisma/client';

export class ExpenseCategoryResponseDto implements ExpenseCategory {
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
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty({ enum: [CashFlowOperation] })
  operation: CashFlowOperation;

  @ApiProperty()
  account: string;
}
