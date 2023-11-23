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
import { ProductCategory, User } from '@prisma/client';

@ApiTags('ProductCategory')
@Controller({ path: '/product-category', version: '1' })
export class ProductCategoryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.prismaService.product.findUniqueOrThrow({
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Get()
  findAll(@PaginationInfo() paginationInfo: RequestPaginationInfoDto) {
    return this.prismaService.productCategory.findMany({
      select: {
        ...PrismaService.DEFAULT_SELECT,
        ...PrismaService.PRODUCT_CATEGORY_DEFAULT_SELECT,
        createdBy: { select: PrismaService.USER_DEFAULT_SELECT },
      },
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: {
        ...PrismaService.DEFAULT_WHERE,
        OR: paginationInfo.search
          ? [
              { name: { contains: paginationInfo.search } },
              { description: { contains: paginationInfo.search } },
            ]
          : [],
      },
      orderBy: PrismaService.ORDER_BY_LATEST,
    });
  }

  @Post()
  create(@Body() productCategory: ProductCategory, @CurrentUser() user: User) {
    return this.prismaService.productCategory.create({
      data: {
        ...productCategory,
        createdById: user.id,
        updatedById: user.id,
      },
    });
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: ProductCategory,
    @CurrentUser() user: User,
  ) {
    return this.prismaService.productCategory.update({
      data: { ...data, updatedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Delete('/:id')
  delete(@Param('id') id: number, @CurrentUser() user: User) {
    return this.prismaService.productCategory.update({
      data: { ...PrismaService.DEFAULT_SOFT_DELETE_DATA, deletedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }
}
