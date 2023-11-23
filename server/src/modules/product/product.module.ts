import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductCategoryController } from './product-category.controller';

@Module({
  controllers: [ProductCategoryController, ProductController],
})
export class ProductModule {}
