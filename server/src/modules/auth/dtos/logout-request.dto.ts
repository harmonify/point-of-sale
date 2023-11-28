import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, ValidateIf } from 'class-validator';

export class LogoutRequestDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  fromAll?: boolean;

  @ValidateIf((o) => typeof o.fromAll !== 'boolean')
  @IsString()
  @ApiProperty()
  readonly refreshToken: string;
}
