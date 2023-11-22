import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isBlocked: boolean;

  constructor(dto?: Partial<UserResponseDto>) {
    Object.assign(this, dto);
  }
}
