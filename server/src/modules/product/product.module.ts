import { Module } from '@nestjs/common';

import { ProductUnitController } from './product-unit.controller';
import { ProductUnitService } from './product-unit.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController, ProductUnitController],
  providers: [ProductService, ProductUnitService],
  exports: [ProductService, ProductUnitService],
})
export class ProductModule {}
