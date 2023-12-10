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

import { SaleQuery } from './sale.query';
import {
  CreateSaleRequestDto,
  SaleResponseDto,
  UpdateSaleRequestDto,
} from './dtos';

@ApiTags('Sales')
@Controller({ path: '/sales', version: '1' })
export class SaleController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() sale: CreateSaleRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<SaleResponseDto>> {
    const newSale = await this.prismaService.sale.create({
      data: {
        ...sale,
        createdById: user.id,
        updatedById: user.id,
        saleProducts: {
          createMany: {
            data: sale.saleProducts.map((sp) => ({
              ...sp,
              createdById: user.id,
              updatedById: user.id,
            })),
          },
        },
      },
      include: {
        customer: true,
        createdBy: true,
        saleProducts: true,
      },
    });
    return {
      data: newSale,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<SaleResponseDto[]>> {
    const sales = await this.prismaService.sale.findMany({
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              SaleQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
      orderBy: BaseQuery.OrderBy.latest(),
      include: {
        customer: true,
        createdBy: true,
        saleProducts: true,
      },
    });
    return {
      data: sales,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<SaleResponseDto>> {
    const sale = await this.prismaService.sale.findFirstOrThrow({
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
      include: {
        customer: true,
        createdBy: true,
        saleProducts: true,
      },
    });
    return {
      data: sale,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: CreateSaleRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<SaleResponseDto>> {
    const updatedSale = await this.prismaService.sale.update({
      data: {
        ...data,
        updatedById: user.id,
        saleProducts: BaseQuery.nestedUpsertMany(data.saleProducts, user.id),
      },
      where: BaseQuery.Filter.byId(id),
      include: {
        customer: true,
        createdBy: true,
        saleProducts: true,
      },
    });
    return {
      data: updatedSale,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.sale.update({
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
