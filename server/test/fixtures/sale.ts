import { CreateSaleRequestDto } from '@/modules/sale';
import { Sale, SaleProduct } from '@prisma/client';
import { DateTime } from 'luxon';

import { customer } from './customer';
import { productDozenUnit, productPieceUnit } from './product';
import { testUser } from './user';

export const sale: Sale = {
  id: 1,
  isActive: true,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
  name: 'Selling Eggs',
  description: 'Selling eggs shoulder knee and toes',
  customerId: customer.id,
  note: 'The egg is boiled',
  isNoteVisible: true,
  discountOnTotal: 10,
  taxOnTotal: 0,
  billAmount: 10,
  netAmount: 9,
};

export const salePieceProduct: SaleProduct = {
  id: 1,
  isActive: true,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
  saleId: sale.id,
  productUnitId: productPieceUnit.id,
  quantity: 100,
  costPrice: 80,
  sellingPrice: 100,
  discount: 0,
  tax: 0,
};

export const saleDozenProduct: SaleProduct = {
  id: 2,
  isActive: true,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
  saleId: sale.id,
  productUnitId: productDozenUnit.id,
  quantity: 1,
  costPrice: 960,
  sellingPrice: 1000,
  discount: 0,
  tax: 0,
};

export const createSaleDto: CreateSaleRequestDto = {
  ...sale,
  saleProducts: [salePieceProduct, saleDozenProduct],
};
