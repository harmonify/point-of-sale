import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';

export class UpdateUserRequestDto {
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
}
