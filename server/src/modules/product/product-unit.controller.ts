import { IResponseBody } from '@/libs/http';
import { BaseQuery } from '@/libs/prisma';
import { BadRequestException, Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'nestjs-prisma';

@ApiTags('ProductUnits')
@Controller({ path: '/product-units', version: '1' })
export class ProductUnitController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<IResponseBody> {
    const productUnit = await this.prismaService.productUnit.findUniqueOrThrow({
      where: {
        ...BaseQuery.Filter.available(),
        id: id,
      },
    });

    const productProductUnitCount = await this.prismaService.productUnit.count({
      where: {
        ...BaseQuery.Filter.available(),
        productId: productUnit?.productId,
      },
    });

    if (productProductUnitCount <= 1) {
      throw new BadRequestException({
        message:
          'Cannot delete product unit as the product only has one product unit',
      });
    }

    const soldProductsCount = await this.prismaService.saleProduct.count({
      where: {
        ...BaseQuery.Filter.available(),
        productUnitId: id,
      },
    });

    if (soldProductsCount > 0) {
      throw new BadRequestException({
        message:
          'Cannot delete product unit as this product unit has been sold before',
      });
    }

    await this.prismaService.productUnit.delete({
      where: BaseQuery.Filter.byId(id),
    });
  }
}
