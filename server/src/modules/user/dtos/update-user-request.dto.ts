import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserRequestDto implements Prisma.UserUpdateInput {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    example: 'John',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: 'john@example.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: '12345678',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '6289502376888',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: true,
  })
  blockReason?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  deletedAt?: Date;
}
