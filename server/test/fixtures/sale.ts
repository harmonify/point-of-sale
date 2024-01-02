import { CreateSaleRequestDto } from '@/modules/sale';
import { FlatOrPercentage, Sale, SaleProduct } from '@prisma/client';
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
  subTotal: 1100,
  inputDiscountTotal: 110,
  discountTotalType: FlatOrPercentage.FLAT,
  discountTotal: 110,
  inputTaxTotal: 55,
  taxTotalType: FlatOrPercentage.PERCENTAGE,
  taxTotal: 55,
  total: 1045,
  paid: 1100,
  change: 55,
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
  quantity: 1,
  price: 100,
  subTotal: 100,
  inputDiscount: 10,
  discountType: FlatOrPercentage.FLAT,
  discount: 10,
  inputTax: 5,
  taxType: FlatOrPercentage.PERCENTAGE,
  tax: 5,
  total: 95,
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
  price: 1000,
  subTotal: 1000,
  inputDiscount: 100,
  discountType: FlatOrPercentage.FLAT,
  discount: 100,
  inputTax: 50,
  taxType: FlatOrPercentage.PERCENTAGE,
  tax: 50,
  total: 950,
};

export const createSaleDto: CreateSaleRequestDto = {
  ...sale,
  saleProducts: [salePieceProduct, saleDozenProduct],
};
