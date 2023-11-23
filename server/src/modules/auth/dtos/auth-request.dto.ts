import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'john-doe@example.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Hello123',
  })
  readonly password: string;
}
