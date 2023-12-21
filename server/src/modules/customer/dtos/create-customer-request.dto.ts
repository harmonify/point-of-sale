import { ApiProperty } from '@nestjs/swagger';
import { Gender, Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCustomerRequestDto
  implements Omit<Prisma.CustomerCreateInput, 'createdBy' | 'updatedBy'>
{
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive?: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

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
}
