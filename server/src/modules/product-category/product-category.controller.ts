import {
  IResponseBody,
  PaginationInfo,
  RequestPaginationInfoDto,
} from '@/libs/http';
import { BaseQuery } from '@/libs/prisma';
import { CurrentUser, SkipAuth } from '@/modules/auth';
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
  CreateProductCategoryRequestDto,
  ProductCategoryResponseDto,
  UpdateProductCategoryRequestDto,
} from './dtos';
import { ProductCategoryQuery } from './product-category.query';

@ApiTags('ProductCategories')
@Controller({ path: '/product-categories', version: '1' })
export class ProductCategoryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() productCategory: CreateProductCategoryRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProductCategoryResponseDto>> {
    const newProductCategory = await this.prismaService.productCategory.create({
      data: {
        ...productCategory,
        createdById: user.id,
        updatedById: user.id,
      },
    });
    return {
      data: newProductCategory,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<ProductCategoryResponseDto[]>> {
    const productCategories = await this.prismaService.productCategory.findMany(
      {
        select: ProductCategoryQuery.Field.default(),
        skip: paginationInfo.skip,
        take: paginationInfo.take,
        where: paginationInfo.search
          ? {
              AND: [
                BaseQuery.Filter.available(),
                ProductCategoryQuery.Filter.search(paginationInfo.search),
              ],
            }
          : BaseQuery.Filter.available(),
        orderBy: BaseQuery.OrderBy.latest(),
      },
    );
    return {
      data: productCategories,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<ProductCategoryResponseDto>> {
    const productCategory =
      await this.prismaService.productCategory.findUniqueOrThrow({
        select: ProductCategoryQuery.Field.default(),
        where: {
          ...BaseQuery.Filter.available(),
          id,
        },
      });
    return {
      data: productCategory,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProductCategoryRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProductCategoryResponseDto>> {
    const updatedProductCategory =
      await this.prismaService.productCategory.update({
        data: { ...data, updatedById: user.id },
        where: BaseQuery.Filter.byId(id),
      });
    return {
      data: updatedProductCategory,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.productCategory.update({
      data: BaseQuery.getSoftDeleteData(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
