import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';

import type { Prisma } from '@prisma/client';
type BASE_FIELDS = 'id' | 'isActive' | 'createdAt' | 'updatedAt' | 'deletedAt';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Base
  static readonly DEFAULT_SELECT: Record<BASE_FIELDS, true | undefined> = {
    id: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  };
  static readonly DEFAULT_WHERE = { deletedAt: null };
  static readonly DEFAULT_WHERE_ACTIVE = { isActive: true, deletedAt: null };
  static get DEFAULT_SOFT_DELETE_DATA() {
    return { deletedAt: DateTime.now().toJSDate() };
  }
  static readonly ORDER_BY_LATEST: Record<string, Prisma.SortOrder> = {
    createdAt: 'desc',
  };

  // Customer
  static readonly CUSTOMER_DEFAULT_SELECT: Omit<
    Prisma.CustomerSelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    name: true,
    address: true,
    description: true,
    email: true,
    gender: true,
    phoneNumber: true,
  };

  // Procurement
  static readonly PROCUREMENT_DEFAULT_SELECT: Omit<
    Prisma.ProcurementSelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    deliveredAt: true,
    deliveryStatus: true,
    invoiceDate: true,
    invoiceNumber: true,
    name: true,
    payedAt: true,
    paymentStatus: true,
  };

  static readonly PROCUREMENT_PRODUCT_DEFAULT_SELECT: Omit<
    Prisma.ProcurementProductSelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    price: true,
    quantity: true,
  };

  // Product
  static readonly PRODUCT_DEFAULT_SELECT: Omit<
    Prisma.ProductSelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    name: true,
    description: true,
    barcode: true,
    barcodeType: true,
  };

  // Product Category
  static readonly PRODUCT_CATEGORY_DEFAULT_SELECT: Omit<
    Prisma.CategorySelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    name: true,
    description: true,
  };

  // Product Unit
  static readonly PRODUCT_UNIT_DEFAULT_SELECT: Omit<
    Prisma.ProductUnitSelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    name: true,
    description: true,
    sellingPrice: true,
    wholesalePrice: true,
  };

  static readonly SALE_DEFAULT_SELECT: Omit<
    Prisma.SaleSelectScalar,
    BASE_FIELDS
  > = {
    billAmount: true,
    description: true,
    discountOnTotal: true,
    taxOnTotal: true,
    netAmount: true,
  };

  // Provider
  static readonly PROVIDER_DEFAULT_SELECT: Omit<
    Prisma.ProviderSelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    name: true,
    email: true,
    phoneNumber: true,
    description: true,
    address: true,
  };

  // User
  static readonly USER_DEFAULT_SELECT: Omit<
    Prisma.UserSelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    name: true,
    email: true,
    phoneNumber: true,
    blockReason: true,
  };

  async onModuleInit() {
    // Note: this is optional
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
