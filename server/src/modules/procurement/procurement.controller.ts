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
import { Procurement, User } from '@prisma/client';

@ApiTags('Procurements')
@Controller({ path: '/procurements', version: '1' })
export class ProcurementController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.prismaService.procurement.findUniqueOrThrow({
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Get()
  findAll(@PaginationInfo() paginationInfo: RequestPaginationInfoDto) {
    return this.prismaService.procurement.findMany({
      select: {
        ...PrismaService.DEFAULT_SELECT,
        ...PrismaService.PROCUREMENT_DEFAULT_SELECT,
        provider: { select: PrismaService.PROVIDER_DEFAULT_SELECT },
        procurementProducts: {
          select: PrismaService.PROCUREMENT_PRODUCT_DEFAULT_SELECT,
        },
        createdBy: { select: PrismaService.USER_DEFAULT_SELECT },
      },
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: {
        ...PrismaService.DEFAULT_WHERE,
        OR: paginationInfo.search
          ? [
              { provider: { name: { contains: paginationInfo.search } } },
              {
                procurementProducts: {
                  some: {
                    product: { name: { contains: paginationInfo.search } },
                  },
                },
              },
            ]
          : [],
      },
      orderBy: PrismaService.ORDER_BY_LATEST,
    });
  }

  @Post()
  create(@Body() procurement: Procurement, @CurrentUser() user: User) {
    return this.prismaService.procurement.create({
      data: {
        ...procurement,
        createdById: user.id,
        updatedById: user.id,
      },
    });
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: Procurement,
    @CurrentUser() user: User,
  ) {
    return this.prismaService.procurement.update({
      data: { ...data, updatedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Delete('/:id')
  delete(@Param('id') id: number, @CurrentUser() user: User) {
    return this.prismaService.procurement.update({
      data: { ...PrismaService.DEFAULT_SOFT_DELETE_DATA, deletedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }
}
