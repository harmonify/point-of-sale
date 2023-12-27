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

import { SupplierQuery } from './supplier.query';
import {
  CreateSupplierRequestDto,
  SupplierInfoResponseDto,
  SupplierResponseDto,
  UpdateSupplierRequestDto,
} from './dtos';

@ApiTags('Suppliers')
@Controller({ path: '/suppliers', version: '1' })
export class SupplierController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() supplier: CreateSupplierRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<SupplierResponseDto>> {
    const newSupplier = await this.prismaService.supplier.create({
      include: {
        createdBy: { select: { name: true } },
      },
      data: {
        ...supplier,
        createdById: user.id,
        updatedById: user.id,
      },
    });
    return {
      data: newSupplier,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<SupplierInfoResponseDto[]>> {
    const suppliers = await this.prismaService.supplier.findMany({
      ...(!paginationInfo.all && {
        skip: paginationInfo.skip,
        take: paginationInfo.take,
      }),
      include: {
        createdBy: { select: { name: true } },
      },
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              SupplierQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
      orderBy: BaseQuery.OrderBy.latest(),
    });
    console.log(`🚀 ~ suppliers ~ ${JSON.stringify(suppliers, null, 2)}`);
    return {
      data: suppliers.map((supplier) => ({
        ...supplier,
        createdByName: supplier.createdBy.name,
      })),
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<SupplierResponseDto>> {
    const supplier = await this.prismaService.supplier.findFirstOrThrow({
      include: {
        createdBy: { select: { name: true } },
      },
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
    });
    return {
      data: supplier,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateSupplierRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<SupplierResponseDto>> {
    const updatedSupplier = await this.prismaService.supplier.update({
      include: {
        createdBy: { select: { name: true } },
      },
      data: { ...data, updatedById: user.id },
      where: BaseQuery.Filter.byId(id),
    });
    return {
      data: updatedSupplier,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.supplier.update({
      include: {
        createdBy: { select: { name: true } },
      },
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
