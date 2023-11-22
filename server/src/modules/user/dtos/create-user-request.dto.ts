import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export class CreateUserRequestDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty({
    example: 'jdoe',
  })
  username: string;

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
  @Matches(passwordRegex, { message: 'Password too weak' })
  @ApiProperty({
    example: 'Hello123',
  })
  password: string;
}
