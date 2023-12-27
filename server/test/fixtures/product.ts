import { CreateProductRequestDto } from '@/modules/product';
import { BarcodeType, Product, ProductUnit } from '@prisma/client';
import { DateTime } from 'luxon';

import { category } from './category';
import { dozenUnit, pieceUnit } from './unit';
import { testUser } from './user';

export const product: Product = {
  id: 1,
  isActive: true,
  name: 'Egg',
  description: 'Egg shoulder knee and toes',
  categoryId: category.id,
  barcode: '1234567890',
  barcodeType: BarcodeType.EAN_13,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};

export const productPieceUnit: ProductUnit = {
  id: 1,
  isActive: true,
  productId: product.id,
  unitId: pieceUnit.id,
  price: 100,
  // wholesalePrice: 80,
  // lowQuantity: 0,
  // stockAlertEnabled: false,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};

export const productDozenUnit: ProductUnit = {
  id: 2,
  isActive: true,
  productId: product.id,
  unitId: dozenUnit.id,
  price: 100,
  // wholesalePrice: 80,
  // lowQuantity: 0,
  // stockAlertEnabled: false,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
};

export const createProductDto: CreateProductRequestDto = {
  ...product,
  productUnits: [productPieceUnit, productDozenUnit],
};
