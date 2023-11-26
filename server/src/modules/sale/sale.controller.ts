import { PaginationInfo, RequestPaginationInfoDto } from '@/libs/http';
import { PrismaService } from '@/libs/prisma';
import { CurrentUser } from '@/modules/auth';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Sale, User } from '@prisma/client';
import { SaleService } from './sale.service';

@ApiTags('Sales')
@Controller({ path: '/sales', version: '1' })
export class SaleController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly saleService: SaleService,
  ) {}

  // @Post('/checkout')
  // public checkout(
  //   @Param('saleId') saleId: number,
  //   @CurrentUser() user: User,
  //   @Body() checkoutDto: CheckoutDto,
  // ) {
  //   return this.saleService.checkout(user, {
  //     saleId,
  //     user,
  //     checkoutDto,
  //   });
  // }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.prismaService.sale.findUniqueOrThrow({
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Get()
  findAll(@PaginationInfo() paginationInfo: RequestPaginationInfoDto) {
    return this.prismaService.sale.findMany({
      select: {
        ...PrismaService.DEFAULT_SELECT,
        ...PrismaService.SALE_DEFAULT_SELECT,
        customer: { select: PrismaService.CUSTOMER_DEFAULT_SELECT },
        createdBy: { select: PrismaService.USER_DEFAULT_SELECT },
      },
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: {
        ...PrismaService.DEFAULT_WHERE,
        OR: paginationInfo.search
          ? [
              { comments: { contains: paginationInfo.search } },
              { customer: { name: { contains: paginationInfo.search } } },
              { createdBy: { name: { contains: paginationInfo.search } } },
            ]
          : [],
      },
      orderBy: PrismaService.ORDER_BY_LATEST,
    });
  }

  @Post()
  create(@Body() sale: Sale, @CurrentUser() user: User) {
    return this.prismaService.sale.create({
      data: {
        ...sale,
        createdById: user.id,
        updatedById: user.id,
      },
    });
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: Sale,
    @CurrentUser() user: User,
  ) {
    return this.prismaService.sale.update({
      data: { ...data, updatedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Delete('/:id')
  delete(@Param('id') id: number, @CurrentUser() user: User) {
    return this.prismaService.sale.update({
      data: { ...PrismaService.DEFAULT_SOFT_DELETE_DATA, deletedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }
}
