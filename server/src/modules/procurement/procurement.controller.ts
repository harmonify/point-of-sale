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

import { ProcurementQuery } from './procurement.query';
import {
  CreateProcurementRequestDto,
  ProcurementResponseDto,
  UpdateProcurementRequestDto,
} from './dtos';

@ApiTags('Procurements')
@Controller({ path: '/procurements', version: '1' })
export class ProcurementController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() procurement: CreateProcurementRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProcurementResponseDto>> {
    const newProcurement = await this.prismaService.procurement.create({
      data: {
        ...procurement,
        createdById: user.id,
        updatedById: user.id,
        procurementProducts: {
          createMany: {
            data: procurement.procurementProducts.map((pp) => ({
              ...pp,
              createdById: user.id,
              updatedById: user.id,
            })),
          },
        },
      },
      include: {
        procurementProducts: true,
      },
    });
    return {
      data: newProcurement,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<ProcurementResponseDto[]>> {
    const procurements = await this.prismaService.procurement.findMany({
      include: {
        procurementProducts: true,
      },
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              ProcurementQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
      orderBy: BaseQuery.OrderBy.latest(),
    });
    return {
      data: procurements,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<ProcurementResponseDto>> {
    const procurement = await this.prismaService.procurement.findFirstOrThrow({
      include: {
        procurementProducts: true,
      },
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
    });
    return {
      data: procurement,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProcurementRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProcurementResponseDto>> {
    const updatedProcurement = await this.prismaService.procurement.update({
      data: {
        ...data,
        updatedById: user.id,
        procurementProducts: BaseQuery.nestedUpsertMany(
          data.procurementProducts,
          user.id,
        ),
      },
      where: { id },
      include: {
        procurementProducts: true,
      },
    });
    return {
      data: updatedProcurement,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.procurement.update({
      data: BaseQuery.softDelete(user.id),
      where: { id },
    });
  }
}
