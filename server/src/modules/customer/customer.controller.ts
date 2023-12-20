import {
  IResponseBody,
  PaginationInfo,
  RequestPaginationInfoDto,
} from '@/libs/http';
import { BaseQuery } from '@/libs/prisma';
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
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { CustomerQuery } from './customer.query';
import {
  CreateCustomerRequestDto,
  CustomerResponseDto,
  UpdateCustomerRequestDto,
} from './dtos';
import _ from 'lodash';
import { CustomerInfoResponseDto } from './dtos/customer-info-response.dto';

@ApiTags('Customers')
@Controller({ path: '/customers', version: '1' })
export class CustomerController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() customer: CreateCustomerRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<CustomerResponseDto>> {
    const newCustomer = await this.prismaService.customer.create({
      include: {
        createdBy: true,
      },
      data: {
        ...customer,
        createdById: user.id,
        updatedById: user.id,
      },
    });
    return {
      data: newCustomer,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<CustomerInfoResponseDto[]>> {
    const customers = await this.prismaService.customer.findMany({
      include: {
        createdBy: { select: { name: true } },
        sales: { select: { netAmount: true } },
      },
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              CustomerQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
      orderBy: BaseQuery.OrderBy.latest(),
    });
    return {
      data: customers.map((customer) => ({
        ...customer,
        authorName: customer.createdBy.name,
        purchasedAmount: _.sumBy(customer.sales, (sale) => sale.netAmount),
      })),
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<CustomerResponseDto>> {
    const customer = await this.prismaService.customer.findFirstOrThrow({
      include: {
        createdBy: true,
      },
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
    });
    return {
      data: customer,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateCustomerRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<CustomerResponseDto>> {
    const updatedCustomer = await this.prismaService.customer.update({
      include: {
        createdBy: true,
      },
      data: { ...data, updatedById: user.id },
      where: BaseQuery.Filter.byId(id),
    });
    return {
      data: updatedCustomer,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.customer.update({
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
