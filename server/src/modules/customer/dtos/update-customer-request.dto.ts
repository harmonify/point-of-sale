import { ApiProperty } from '@nestjs/swagger';
import { Gender, Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCustomerRequestDto implements Prisma.CustomerUpdateInput {
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
  @ApiProperty({ enum: Gender })
  gender?: Gender | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phoneNumber?: string | null;

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address?: string | null;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  deletedAt?: Date | null;
}
