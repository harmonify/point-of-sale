import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'jDoe',
  })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Hello123',
  })
  readonly password: string;
}
