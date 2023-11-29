import currency from 'currency.js';
import * as responseMessages from './constants/response-messages';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/libs/prisma';
import { DateTime } from 'luxon';
import { Sale, SaleProduct, Prisma, User } from '@prisma/client';

@Injectable()
export class SaleService {
  constructor(private readonly prismaService: PrismaService) {}

  public async checkoutSale(
    user: User,
    // saleDetails: CheckoutSale,
  ): Promise<any> {
    // await this.prismaService.$transaction(async (tx) => {
    //   totalPrice = currency(totalPrice).value;
    //   netTotalPrice = currency(netTotalPrice).value;
    //   totalDiscount = currency(totalDiscount).value;

    //   transactionHeader.transactionStatus = TransactionStatus.Done;
    //   transactionHeader.taxPercentageString = saleDetails.taxPercentageString;
    //   transactionHeader.tax = saleDetails.tax;
    //   transactionHeader.discountOnTotal = currency(
    //     saleDetails.totalDiscount,
    //   ).value;
    //   transactionHeader.discountOnItems = totalDiscount;
    //   // Total of all products without any discount or tax.
    //   transactionHeader.netAmount = currency(netTotalPrice).value;
    //   // Total of netAmount + tax + discount.
    //   transactionHeader.billAmount = currency(totalPrice)
    //     .add(saleDetails.tax)
    //     .subtract(saleDetails.totalDiscount).value;

    //   transactionHeader.amountPaid = currency(saleDetails.amountPaid).value;
    //   transactionHeader.updatedBy = userId;
    //   transactionHeader.salesType = saleDetails.saleType;
    // });
    return responseMessages.SALE_COMPLETED_SUCCESS;
  }

  private buildNewSale(params: { id: number; user: User }): Sale {
    const now = new Date();
    return {
      id: params.id,
      isActive: true,
      createdAt: now,
      updatedAt: now,
      createdById: params.user.id,
      updatedById: params.user.id,
      customerId: null,
      description: null,
      billAmount: 0,
      discountOnTotal: 0,
      taxOnTotal: 0,
      netAmount: 0,
      deletedAt: null,
      deletedById: null,
    };
  }
}
