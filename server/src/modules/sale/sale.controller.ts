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
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { SaleQuery } from './sale.query';
import {
  CreateSaleRequestDto,
  SaleProductResponseDto,
  SaleResponseDto,
  UpdateSaleRequestDto,
} from './dtos';
import { DateTime } from 'luxon';
import { SaleService } from './sale.service';

@ApiTags('Sales')
@Controller({ path: '/sales', version: '1' })
export class SaleController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly saleService: SaleService,
  ) {}

  @Post()
  async create(
    @Body() sale: CreateSaleRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<SaleResponseDto>> {
    const now = DateTime.now();
    const startOfDay = now.startOf('day').toJSDate();
    const endOfDay = now.endOf('day').toJSDate();

    const newSale = await this.prismaService.$transaction(async (prisma) => {
      const productUnitIds = sale.saleProducts.map((sp) => sp.productUnitId);

      /** Section 1: Sum the sold product unit quantities */
      const soldProductUnits = await prisma.saleProduct.findMany({
        select: {
          productUnitId: true,
          quantity: true,
        },
        where: {
          AND: [
            {
              productUnitId: {
                in: productUnitIds,
              },
            },
            BaseQuery.Filter.available(),
          ],
        },
      });
      const productUnitRecord = productUnitIds.reduce(
        (acc, pu) => {
          if (!acc[pu]) {
            acc[pu] = 0;
          }
          return acc;
        },
        {} as Record<string, number>,
      );
      /** Record of sold product unit quantities */
      const soldProductUnitQuantityRecord: Record<number, number> =
        soldProductUnits.reduce((acc, { productUnitId, quantity }) => {
          if (acc[productUnitId]) {
            acc[productUnitId] += quantity;
          } else {
            acc[productUnitId] = quantity;
          }
          return acc;
        }, productUnitRecord);
      /** END Section 1 */

      /** Section 2: Get accurate product unit price list */
      const procuredProductUnits = await prisma.procurementProduct.findMany({
        select: {
          productUnitId: true,
          price: true,
          quantity: true,
        },
        where: {
          AND: [
            {
              productUnitId: {
                in: productUnitIds,
              },
            },
            BaseQuery.Filter.available(),
          ],
        },
      });
      const productUnitPriceListRecord = procuredProductUnits.reduce(
        (acc, pu) => {
          soldProductUnitQuantityRecord[pu.productUnitId] -= pu.quantity;
          if (soldProductUnitQuantityRecord[pu.productUnitId] < 0) {
            const availableQuantity =
              -soldProductUnitQuantityRecord[pu.productUnitId];
            const priceList = Array.from({ length: availableQuantity }).map(
              () => pu.price,
            );
            if (Array.isArray(acc[pu.productUnitId])) {
              acc[pu.productUnitId].push(...priceList);
            } else {
              acc[pu.productUnitId] = priceList;
            }
          }
          return acc;
        },
        {} as Record<number, number[]>,
      );
      /** END Section 2 */

      /** Section 3: Build the new sold product data, same product unit but different price should be treated as different records */
      const newSoldProducts = sale.saleProducts.reduce((acc, sp) => {
        let prevCostPrice = productUnitPriceListRecord[sp.productUnitId][0];
        let samePriceQuantity = 0;

        for (let i = 0; i < sp.quantity; i++) {
          const currCostPrice = productUnitPriceListRecord[sp.productUnitId][i];
          if (prevCostPrice === currCostPrice) {
            samePriceQuantity += 1;
            if (samePriceQuantity === sp.quantity) {
              acc.push({
                ...sp,
                quantity: samePriceQuantity,
                costPrice: currCostPrice,
                createdById: user.id,
                updatedById: user.id,
              });
            }
          } else {
            acc.push({
              ...sp,
              quantity: samePriceQuantity,
              costPrice: currCostPrice,
              createdById: user.id,
              updatedById: user.id,
            });
            samePriceQuantity = 0;
          }
          prevCostPrice = currCostPrice;
        }
        return acc;
      }, [] as Prisma.SaleProductCreateManySaleInput[]);
      /** END Section 3 */

      /** Section 4: Build the invoice number */
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
      /** END Section 4 */

      /** Section 5: Store into the database */
      const newSale = await prisma.sale.create({
        data: {
          ...sale,
          invoiceNumber,
          createdById: user.id,
          updatedById: user.id,
          saleProducts: {
            createMany: {
              data: newSoldProducts,
            },
          },
        },
        ...this.saleService.getSalePayloadToken(),
      });
      /** END Section 5 */

      return newSale;
    });
    return {
      data: {
        ...newSale,
        saleProducts: this.saleService.mapSaleProducts(newSale.saleProducts),
      },
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
        saleProducts: {
          include: {
            productUnit: {
              include: {
                product: {
                  select: { name: true },
                },
                unit: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    });
    return {
      data: sales.map((sale) => ({
        ...sale,
        saleProducts: this.saleService.mapSaleProducts(sale.saleProducts),
      })),
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
      ...this.saleService.getSalePayloadToken(),
    });
    return {
      data: {
        ...sale,
        saleProducts: this.saleService.mapSaleProducts(sale.saleProducts),
      },
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
          ...this.saleService.getSalePayloadToken(),
        });

        return updatedSale;
      },
    );
    return {
      data: {
        ...updatedSale,
        saleProducts: this.saleService.mapSaleProducts(
          updatedSale.saleProducts,
        ),
      },
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
