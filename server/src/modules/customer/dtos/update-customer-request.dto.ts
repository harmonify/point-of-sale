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
  gender?: Gender;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  deletedAt?: Date;
}
