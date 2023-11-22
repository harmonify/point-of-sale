import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';

export class UpdateUserRequestDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty({
    example: 'jdoe',
  })
  username: string;

  @IsNotEmpty()
  @MaxLength(100)
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

  @IsPhoneNumber()
  @ApiProperty({
    example: '6289502376888',
  })
  phoneNumber?: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  isActive?: boolean;

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  isBlocked?: boolean;
}
