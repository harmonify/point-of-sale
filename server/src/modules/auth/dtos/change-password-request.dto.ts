import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ChangePasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Hello123',
  })
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 0,
  })
  @ApiProperty({
    example: 'Hello123',
  })
  newPassword: string;
}
