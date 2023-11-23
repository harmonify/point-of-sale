import { CurrentUser } from '@/modules/auth';
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderProduct, User } from '@prisma/client';

import { CheckoutSale } from '../../dtos/sale';
import { SaleService } from './sale.service';

@ApiTags('Sale')
@Controller({ path: '/sale', version: '1' })
export class SaleController {
  constructor(private salesService: SaleService) {}

  @Post('/init')
  public initTransaction(@CurrentUser() user: User): Promise<number> {
    return this.salesService.initTransaction(userId);
  }

  @Post('/:transactionId/open')
  public openTransaction(
    @CurrentUser() user: User,
    @Param('transactionId') transactionId: number,
  ) {
    return this.salesService.openTransaction(userId, transactionId);
  }

  @Put('/:transactionId/cart')
  public updateCart(
    @Param('transactionId') transactionId: number,
    @Body() orderProducts: OrderProduct[],
    @CurrentUser() user: User,
  ) {
    return this.salesService.updateCart(userId, {
      transactionId,
      orderProducts,
    });
  }

  @Post('/:transactionId/checkout')
  public checkout(
    @Param('transactionId') transactionId: number,
    @CurrentUser() user: User,
    @Body() saleDetails: CheckoutSale,
  ) {
    return this.salesService.checkout({
      transactionId,
      userId,
      saleDetails,
    });
  }

  @Delete('/:transactionId/:productId')
  public removeItemFromCart(
    @Param('transactionId') transactionId: number,
    @Param('productId') productId: string,
  ) {
    return this.salesService.removeItemFromCart(transactionId, productId);
  }
}
