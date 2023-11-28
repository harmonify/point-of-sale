import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'john-doe@example.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Hello123',
  })
  readonly password: string;
}
