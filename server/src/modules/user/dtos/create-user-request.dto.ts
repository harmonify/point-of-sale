import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserRequestDto {
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    example: 'John',
  })
  name: string;

  @IsOptional()
  @MaxLength(255)
  @ApiProperty({
    example: 'john@example.com',
  })
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty({
    example: '6289502376888',
  })
  phoneNumber?: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 64)
  @IsStrongPassword({ minLength: 8 }, { message: 'Password too weak' })
  @ApiProperty({
    example: 'Hello123',
  })
  password: string;
}
