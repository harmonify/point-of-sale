import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string | number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;

  constructor(dto?: Partial<UserResponseDto>) {
    Object.assign(this, dto);
  }
}
