import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../user/dtos';

export class AuthResponseDto {
  @ApiProperty({ type: [UserResponseDto] })
  user: UserResponseDto;

  @ApiProperty({ example: 'Bearer' })
  tokenType: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXKYjj.eyJ' })
  accessToken: string;

  @ApiProperty({ example: 'eyJh3d06e6e3e152ae839a6623c3cb6f961a.eyJ' })
  refreshToken?: string;
}
