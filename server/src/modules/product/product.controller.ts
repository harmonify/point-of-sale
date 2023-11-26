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
import { Product, User } from '@prisma/client';

@ApiTags('Products')
@Controller({ path: '/products', version: '1' })
export class ProductController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.prismaService.product.findUniqueOrThrow({
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Get()
  findAll(@PaginationInfo() paginationInfo: RequestPaginationInfoDto) {
    return this.prismaService.product.findMany({
      select: {
        ...PrismaService.DEFAULT_SELECT,
        ...PrismaService.PRODUCT_DEFAULT_SELECT,
        productCategory: {
          select: PrismaService.PRODUCT_CATEGORY_DEFAULT_SELECT,
        },
        productUnits: { select: PrismaService.PRODUCT_UNIT_DEFAULT_SELECT },
        createdBy: { select: PrismaService.USER_DEFAULT_SELECT },
      },
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: {
        ...PrismaService.DEFAULT_WHERE,
        OR: paginationInfo.search
          ? [{ name: { contains: paginationInfo.search } }]
          : [],
      },
      orderBy: PrismaService.ORDER_BY_LATEST,
    });
  }

  @Post()
  create(@Body() product: Product, @CurrentUser() user: User) {
    return this.prismaService.product.create({
      data: {
        ...product,
        createdById: user.id,
        updatedById: user.id,
      },
    });
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: Product,
    @CurrentUser() user: User,
  ) {
    return this.prismaService.product.update({
      data: { ...data, updatedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Delete('/:id')
  delete(@Param('id') id: number, @CurrentUser() user: User) {
    return this.prismaService.product.update({
      data: { ...PrismaService.DEFAULT_SOFT_DELETE_DATA, deletedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }
}
