import { UserResponseDto } from '@/modules/user';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDto {
  @ApiProperty({ type: [UserResponseDto] })
  user: UserResponseDto;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXKYjj.eyJ' })
  accessToken: string;
}
