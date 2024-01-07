import { IResponseBody } from '@/libs/http';
import { BaseQuery } from '@/libs/prisma';
import { BadRequestException, Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'nestjs-prisma';
import { ProductUnitService } from '../product';

@ApiTags('ProcurementProducts')
@Controller({ path: '/procurement-products', version: '1' })
export class ProcurementProductController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productUnitService: ProductUnitService,
  ) {}

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<IResponseBody> {
    const procurementProduct =
      await this.prismaService.procurementProduct.findUniqueOrThrow({
        where: {
          ...BaseQuery.Filter.available(),
          id: id,
        },
      });

    const productOnProcurementCount =
      await this.prismaService.procurementProduct.count({
        where: {
          ...BaseQuery.Filter.available(),
          procurementId: procurementProduct?.procurementId,
        },
      });

    if (productOnProcurementCount <= 1) {
      throw new BadRequestException({
        message:
          'Cannot delete procured product as the procurement only has one procured product',
      });
    }

    const availableQuantity =
      await this.productUnitService.countProductUnitAvailableQuantityAsync(
        procurementProduct.productUnitId,
      );

    if (availableQuantity - procurementProduct.quantity < 0) {
      throw new BadRequestException({
        message:
          'Cannot delete procured product as this will cause negative stock',
      });
    }

    await this.prismaService.procurementProduct.delete({
      where: BaseQuery.Filter.byId(id),
    });
  }
}
