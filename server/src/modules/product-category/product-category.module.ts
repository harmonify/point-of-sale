import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product-category.controller';

@Module({
  controllers: [ProductCategoryController],
})
export class ProductCategoryModule {}
