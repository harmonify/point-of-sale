import {
  IResponseBody,
  PaginationInfo,
  RequestPaginationInfoDto,
} from '@/libs/http';
import { PrismaService, BaseQuery } from '@/libs/prisma';
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
import { Customer, User } from '@prisma/client';
import { CustomerQuery } from './customer.query';
import { UserQuery } from '../user/user.query';

@ApiTags('Customers')
@Controller({ path: '/customers', version: '1' })
export class CustomerController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<IResponseBody> {
    const customer = await this.prismaService.customer.findUniqueOrThrow({
      select: BaseQuery.Field.default(),
      where: { ...BaseQuery.Filter.available(), id },
    });
    return {
      data: customer,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody> {
    let whereQuery = BaseQuery.Filter.available();
    if (paginationInfo.search) {
      whereQuery = {
        ...whereQuery,
        ...CustomerQuery.Filter.search(paginationInfo.search),
      };
    }

    const customers = await this.prismaService.customer.findMany({
      select: {
        ...BaseQuery.Field.default(),
        ...CustomerQuery.Field.default(),
        createdBy: { select: UserQuery.Field.default() },
      },
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: whereQuery,
      orderBy: BaseQuery.OrderBy.latest(),
    });
    return {
      data: customers,
    };
  }

  @Post()
  async create(
    @Body() customer: Customer,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    const newCustomer = await this.prismaService.customer.create({
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

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: Customer,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    const updatedCustomer = await this.prismaService.customer.update({
      data: { ...data, updatedById: user.id },
      where: { id },
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
      data: BaseQuery.getSoftDeleteData(user.id),
      where: { id },
    });
  }
}
