import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryResponseDto implements Category {
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
  createdById: number;

  @ApiProperty()
  updatedById: number;

  @ApiProperty()
  deletedById: number | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;
}
