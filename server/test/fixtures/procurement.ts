import { CreateProcurementRequestDto } from '@/modules/procurement';
import {
  Procurement,
  ProcurementDeliveryStatus,
  ProcurementPaymentStatus,
  ProcurementProduct,
} from '@prisma/client';
import { DateTime } from 'luxon';

import { productDozenUnit, productPieceUnit } from './product';
import { provider } from './provider';
import { testUser } from './user';

export const procurement: Procurement = {
  id: 1,
  isActive: true,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
  providerId: provider.id,
  name: 'Getting Eggs',
  description: 'Getting eggs shoulder knee and toes',
  deliveryStatus: ProcurementDeliveryStatus.DELIVERED,
  deliveredAt: DateTime.now().toJSDate(),
  invoiceDate: DateTime.now().toJSDate(),
  invoiceNumber: '1234567890',
  payedAt: DateTime.now().toJSDate(),
  paymentStatus: ProcurementPaymentStatus.PAID,
};

export const procurementPieceProduct: ProcurementProduct = {
  id: 1,
  isActive: true,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
  procurementId: procurement.id,
  productUnitId: productPieceUnit.id,
  price: 5,
  quantity: 100,
};

export const procurementDozenProduct: ProcurementProduct = {
  id: 2,
  isActive: true,
  createdAt: DateTime.fromObject({ year: 2023 }).toJSDate(),
  updatedAt: DateTime.now().toJSDate(),
  deletedAt: null,
  createdById: testUser.id,
  updatedById: testUser.id,
  deletedById: null,
  procurementId: procurement.id,
  productUnitId: productDozenUnit.id,
  price: 5,
  quantity: 1,
};

export const createProcurementDto: CreateProcurementRequestDto = {
  ...procurement,
  procurementProducts: [procurementPieceProduct, procurementDozenProduct],
};
