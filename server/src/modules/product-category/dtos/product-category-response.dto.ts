import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '@prisma/client';

export class ProductCategoryResponseDto implements Partial<ProductCategory> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt?: Date | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string | null;
}
