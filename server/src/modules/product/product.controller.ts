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

import {
  CreateProductRequestDto,
  ProductResponseDto,
  UpdateProductRequestDto,
} from './dtos';
import { ProductQuery } from './product.query';
import { CategoryQuery } from '../category';
import { UserQuery } from '../user';
import { ProductUnitQuery } from './product-unit.query';

@ApiTags('Products')
@Controller({ path: '/products', version: '1' })
export class ProductController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() product: CreateProductRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProductResponseDto>> {
    const newProduct = await this.prismaService.product.create({
      data: {
        ...product,
        createdById: user.id,
        updatedById: user.id,
      },
      include: {
        category: { select: CategoryQuery.Field.default() },
        productUnits: { select: ProductUnitQuery.Field.default() },
        createdBy: { select: UserQuery.Field.default() },
      },
    });
    return {
      data: newProduct,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<ProductResponseDto[]>> {
    const products = await this.prismaService.product.findMany({
      select: {
        ...ProductQuery.Field.default(),
        ...ProductQuery.Field.defaultRelations(),
      },
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              ProductQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
      orderBy: BaseQuery.OrderBy.latest(),
    });
    return {
      data: products,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<ProductResponseDto>> {
    const product = await this.prismaService.product.findUniqueOrThrow({
      select: {
        ...ProductQuery.Field.default(),
        ...ProductQuery.Field.defaultRelations(),
      },
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
    });
    return {
      data: product,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProductRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProductResponseDto>> {
    const updatedProduct = await this.prismaService.product.update({
      data: { ...data, updatedById: user.id },
      include: {
        category: { select: CategoryQuery.Field.default() },
        productUnits: { select: ProductUnitQuery.Field.default() },
        createdBy: { select: UserQuery.Field.default() },
      },
      where: BaseQuery.Filter.byId(id),
    });
    return {
      data: updatedProduct,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.product.update({
      data: BaseQuery.getSoftDeleteData(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
