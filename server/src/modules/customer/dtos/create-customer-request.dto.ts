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
  isActive?: boolean | undefined;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

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
}
