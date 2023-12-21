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
  ): Promise<IResponseBody<SupplierResponseDto[]>> {
    const suppliers = await this.prismaService.supplier.findMany({
      ...(!paginationInfo.all && {
        skip: paginationInfo.skip,
        take: paginationInfo.take,
      }),
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
    return {
      data: suppliers,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<SupplierResponseDto>> {
    const supplier = await this.prismaService.supplier.findFirstOrThrow({
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
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
