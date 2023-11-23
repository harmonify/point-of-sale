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
    phoneNumber: true,
    email: true,
    description: true,
    address: true,
  };

  // Procurement
  static readonly PROCUREMENT_DEFAULT_SELECT: Omit<
    Prisma.ProcurementSelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    price: true,
    qty: true,
    payedAt: true,
  };

  // Product
  static readonly PRODUCT_DEFAULT_SELECT: Omit<
    Prisma.ProductSelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    name: true,
    description: true,
    costPrice: true,
    sellingPrice: true,
  };

  // Product Category
  static readonly PRODUCT_CATEGORY_DEFAULT_SELECT: Omit<
    Prisma.ProductCategorySelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    name: true,
    description: true,
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
  };

  // Vendor
  static readonly VENDOR_DEFAULT_SELECT: Omit<
    Prisma.VendorSelectScalar,
    BASE_FIELDS
  > = {
    ...PrismaService.DEFAULT_SELECT,
    name: true,
    email: true,
    phoneNumber: true,
    description: true,
    address: true,
  };

  async onModuleInit() {
    // Note: this is optional
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
