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
  @IsStrongPassword()
  @ApiProperty({
    example: 'Hello123',
  })
  newPassword: string;
}
