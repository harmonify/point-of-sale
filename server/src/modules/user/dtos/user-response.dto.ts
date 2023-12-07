import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserResponseDto implements Partial<User> {
  @IsInt()
  @ApiProperty()
  id: number;

  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  deletedAt?: Date | null;

  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  blockReason?: string | null;

  constructor(dto?: Partial<UserResponseDto>) {
    Object.assign(this, dto);
  }
}
