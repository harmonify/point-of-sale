import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '@prisma/client';

export class ProviderResponseDto implements Partial<Provider> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  description?: string | null;

  @ApiProperty()
  address: string;
}
