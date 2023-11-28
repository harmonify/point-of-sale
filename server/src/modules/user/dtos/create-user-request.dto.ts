import { ApiProperty } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserRequestDto implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    example: 'John',
  })
  name: string;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    example: 'john@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({
    example: '6289502376888',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 64)
  @IsStrongPassword({ minLength: 8 }, { message: 'Password too weak' })
  @ApiProperty({
    example: 'Hello123',
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  isActive?: boolean;
}
