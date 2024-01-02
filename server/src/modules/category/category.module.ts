import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [CategoryController],
})
export class CategoryModule {}
