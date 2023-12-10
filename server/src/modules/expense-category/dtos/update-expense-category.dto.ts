import { ApiProperty } from '@nestjs/swagger';
import { CashFlowOperation, Prisma } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateExpenseCategoryRequestDto
  implements Omit<Prisma.ExpenseCategoryUpdateInput, 'createdBy' | 'updatedBy'>
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
  description?: string | null;

  @IsOptional()
  @IsEnum(CashFlowOperation)
  @ApiProperty()
  operation?: CashFlowOperation;

  @IsOptional()
  @IsString()
  @ApiProperty()
  account?: string;
}
