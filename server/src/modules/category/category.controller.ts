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

import { CategoryQuery } from './category.query';
import {
  CategoryResponseDto,
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
} from './dtos';

@ApiTags('Categories')
@Controller({ path: '/categories', version: '1' })
export class CategoryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() category: CreateCategoryRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<CategoryResponseDto>> {
    const newCategory = await this.prismaService.category.create({
      data: {
        ...category,
        createdById: user.id,
        updatedById: user.id,
      },
    });
    return {
      data: newCategory,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<CategoryResponseDto[]>> {
    const productCategories = await this.prismaService.category.findMany({
      ...(paginationInfo.all
        ? null
        : {
            skip: paginationInfo.skip,
            take: paginationInfo.take,
            where: paginationInfo.search
              ? {
                  AND: [
                    BaseQuery.Filter.available(),
                    CategoryQuery.Filter.search(paginationInfo.search),
                  ],
                }
              : BaseQuery.Filter.available(),
          }),
      orderBy: BaseQuery.OrderBy.latest(),
    });
    return {
      data: productCategories,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<CategoryResponseDto>> {
    const category = await this.prismaService.category.findFirstOrThrow({
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
    });
    return {
      data: category,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateCategoryRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<CategoryResponseDto>> {
    const updatedCategory = await this.prismaService.category.update({
      data: { ...data, updatedById: user.id },
      where: BaseQuery.Filter.byId(id),
    });
    return {
      data: updatedCategory,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.category.update({
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
