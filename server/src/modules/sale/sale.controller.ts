import {
  IResponseBody,
  PaginationInfo,
  RequestPaginationInfoDto,
} from '@/libs/http';
import { BaseQuery } from '@/libs/prisma';
import { CurrentUser } from '@/modules/auth';
import {
  BadRequestException,
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
import { DateTime } from 'luxon';

@ApiTags('Sales')
@Controller({ path: '/sales', version: '1' })
export class SaleController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() sale: CreateSaleRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<SaleResponseDto>> {
    const now = DateTime.now();
    const startOfDay = now.startOf('day').toJSDate();
    const endOfDay = now.endOf('day').toJSDate();

    const newSale = await this.prismaService.$transaction(async (prisma) => {
      const productUnits = await prisma.productUnit.findMany({
        select: {
          id: true,
          price: true,
        },
        where: {
          AND: [
            {
              id: {
                in: sale.saleProducts.map((sp) => sp.productUnitId),
              },
            },
            BaseQuery.Filter.available(),
          ],
        },
      });

      const productUnitPriceMap = new Map(
        productUnits.map((pu) => [pu.id, pu]),
      );

      const saleCount = await prisma.sale.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      // adjust this to how you like
      const invoiceNumber = `${now.year}${now.month
        .toString()
        .padStart(2, '0')}${now.day.toString().padStart(2, '0')}${(
        saleCount + 101
      )
        .toString()
        .padStart(3, '0')}`;

      const newSale = await prisma.sale.create({
        data: {
          ...sale,
          invoiceNumber,
          createdById: user.id,
          updatedById: user.id,
          saleProducts: {
            createMany: {
              data: sale.saleProducts.map((sp) => {
                const costPrice = productUnitPriceMap.get(sp.productUnitId)
                  ?.price;
                if (!costPrice) {
                  throw new BadRequestException({
                    message: 'Product unit is not valid',
                  });
                }
                return {
                  ...sp,
                  costPrice,
                  createdById: user.id,
                  updatedById: user.id,
                };
              }),
            },
          },
        },
        include: {
          customer: true,
          createdBy: { select: { name: true } },
          saleProducts: true,
        },
      });

      return newSale;
    });
    return {
      data: newSale,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<SaleResponseDto[]>> {
    const paginationRequest = {
      ...(!paginationInfo.all && {
        skip: paginationInfo.skip,
        take: paginationInfo.take,
      }),
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              SaleQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
    };

    const sales = await this.prismaService.sale.findMany({
      ...paginationRequest,
      orderBy: BaseQuery.OrderBy.latest(),
      include: {
        customer: true,
        createdBy: { select: { name: true } },
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
        createdBy: { select: { name: true } },
        saleProducts: true,
      },
    });
    return {
      data: sale,
    };
  }

  /** @deprecated TODO: Not implemented correctly yet */
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateSaleRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<SaleResponseDto>> {
    const updatedSale = await this.prismaService.$transaction(
      async (prisma) => {
        const productUnits = await prisma.productUnit.findMany({
          select: {
            id: true,
            price: true,
          },
          where: {
            AND: [
              {
                id: {
                  in: data.saleProducts.map((sp) => sp.productUnitId),
                },
              },
              BaseQuery.Filter.available(),
            ],
          },
        });

        const productUnitPriceMap = new Map(
          productUnits.map((pu) => [pu.id, pu]),
        );

        const updatedSale = await prisma.sale.update({
          data: {
            ...data,
            updatedById: user.id,
            saleProducts: {
              upsert: data.saleProducts.map((sp) => {
                const costPrice = productUnitPriceMap.get(sp.productUnitId)
                  ?.price;
                if (!costPrice) {
                  throw new BadRequestException({
                    message: 'Product unit is not valid',
                  });
                }
                return {
                  create: {
                    ...sp,
                    costPrice,
                    createdById: user.id,
                    updatedById: user.id,
                  },
                  update: { ...sp, costPrice, updatedById: user.id },
                  where: { id: sp.id },
                };
              }),
            },
          },
          where: BaseQuery.Filter.byId(id),
          include: {
            customer: true,
            createdBy: { select: { name: true } },
            saleProducts: true,
          },
        });

        return updatedSale;
      },
    );
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
    await this.prismaService.saleProduct.updateMany({
      data: BaseQuery.softDelete(user.id),
      where: {
        saleId: id,
      },
    });
  }
}
