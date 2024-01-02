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
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import {
  CreateProductRequestDto,
  ProductResponseDto,
  UpdateProductRequestDto,
} from './dtos';
import { ProductQuery } from './product.query';
import { ProductUnitService } from './product-unit.service';
import { ProductUnitQuery } from './product-unit.query';

@ApiTags('Products')
@Controller({ path: '/products', version: '1' })
export class ProductController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productUnitService: ProductUnitService,
  ) {}

  @Post()
  async create(
    @Body() product: CreateProductRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProductResponseDto>> {
    const newProduct = await this.prismaService.product.create({
      data: {
        ...product,
        productUnits: {
          createMany: {
            data: product.productUnits.map((unit) => ({
              ...unit,
              createdById: user.id,
              updatedById: user.id,
            })),
          },
        },
        createdById: user.id,
        updatedById: user.id,
      },
      include: {
        category: true,
        productUnits: {
          include: ProductUnitQuery.Relation.withQuantityRelationData(),
        },
        createdBy: { select: { name: true } },
      },
    });
    return {
      data: {
        ...newProduct,
        productUnits: newProduct.productUnits.map(
          ({ procurementProducts, saledProducts, ...pu }) => ({
            ...pu,
            availableQuantity:
              this.productUnitService.countProductUnitAvailableQuantity({
                procurementProducts,
                saledProducts,
                ...pu,
              }),
          }),
        ),
      },
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<ProductResponseDto[]>> {
    const products = await this.prismaService.product.findMany({
      include: {
        category: true,
        productUnits: {
          include: ProductUnitQuery.Relation.withQuantityRelationData(),
        },
        createdBy: { select: { name: true } },
      },
      ...(!paginationInfo.all && {
        skip: paginationInfo.skip,
        take: paginationInfo.take,
      }),
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
      data: products.map((product) => ({
        ...product,
        productUnits: product.productUnits.map((pu) => ({
          ...pu,
          availableQuantity:
            this.productUnitService.countProductUnitAvailableQuantity(pu),
        })),
      })),
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<ProductResponseDto>> {
    const product = await this.prismaService.product.findFirstOrThrow({
      include: {
        category: true,
        productUnits: {
          include: ProductUnitQuery.Relation.withQuantityRelationData(),
        },
        createdBy: { select: { name: true } },
      },
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
    });
    return {
      data: {
        ...product,
        productUnits: product.productUnits.map((pu) => ({
          ...pu,
          availableQuantity:
            this.productUnitService.countProductUnitAvailableQuantity(pu),
        })),
      },
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProductRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProductResponseDto>> {
    const updatedProduct = await this.prismaService.product.update({
      data: {
        ...data,
        updatedById: user.id,
        productUnits: BaseQuery.nestedUpsertManyV2(
          data.productUnits,
          user.id,
          (pu) =>
            ({
              productId_unitId: {
                productId: id,
                unitId: pu.unitId,
              },
            }) satisfies Prisma.ProductUnitWhereUniqueInput,
        ),
      },
      include: {
        category: true,
        productUnits: {
          include: ProductUnitQuery.Relation.withQuantityRelationData(),
        },
        createdBy: { select: { name: true } },
      },
      where: BaseQuery.Filter.byId(id),
    });
    return {
      data: {
        ...updatedProduct,
        productUnits: updatedProduct.productUnits.map((pu) => ({
          ...pu,
          availableQuantity:
            this.productUnitService.countProductUnitAvailableQuantity(pu),
        })),
      },
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.product.update({
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
    });
    await this.prismaService.productUnit.updateMany({
      data: BaseQuery.softDelete(user.id),
      where: {
        productId: id,
      },
    });
  }
}
