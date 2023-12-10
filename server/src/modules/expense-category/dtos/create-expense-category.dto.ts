import { ApiProperty } from '@nestjs/swagger';
import { CashFlowOperation, Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseCategoryRequestDto
  implements Omit<Prisma.ExpenseCategoryCreateInput, 'createdBy' | 'updatedBy'>
{
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string | null;

  @IsDefined()
  @IsEnum(CashFlowOperation)
  @ApiProperty()
  operation: CashFlowOperation;

  @IsDefined()
  @IsString()
  @ApiProperty()
  account: string;
}
