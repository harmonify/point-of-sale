import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SaleProductResponseDto } from './dtos';

@Injectable()
export class SaleService {
  getSalePayloadToken() {
    return {
      include: {
        customer: true,
        createdBy: { select: { name: true } },
        saleProducts: {
          include: {
            productUnit: {
              include: {
                product: {
                  include: {
                    category: { select: { name: true } },
                  },
                },
                unit: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    } satisfies Prisma.SaleDefaultArgs;
  }

  mapSaleProducts(
    saleProducts: Prisma.SaleProductGetPayload<
      ReturnType<SaleService['getSalePayloadToken']>['include']['saleProducts']
    >[],
  ) {
    return saleProducts.map(
      (sp) =>
        ({
          ...sp,
          productName: sp.productUnit.product.name,
          unitName: sp.productUnit.unit.name,
        }) satisfies SaleProductResponseDto,
    );
  }
}
