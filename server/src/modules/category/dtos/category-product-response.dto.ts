import { ProductResponseDto } from '@/modules/product';
import { CategoryResponseDto } from './category-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryProductResponseDto extends CategoryResponseDto {
  @ApiProperty()
  products: ProductResponseDto[];
}
