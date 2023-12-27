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

import {
  CreateUnitRequestDto,
  UnitInfoResponseDto,
  UnitResponseDto,
  UpdateUnitRequestDto,
} from './dtos';
import { UnitQuery } from './unit.query';

@ApiTags('Units')
@Controller({ path: '/units', version: '1' })
export class UnitController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() unit: CreateUnitRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<UnitResponseDto>> {
    const newUnit = await this.prismaService.unit.create({
      data: {
        ...unit,
        createdById: user.id,
        updatedById: user.id,
      },
      include: {
        createdBy: { select: { name: true } },
      },
    });
    return {
      data: newUnit,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<UnitInfoResponseDto[]>> {
    const units = await this.prismaService.unit.findMany({
      ...(!paginationInfo.all && {
        skip: paginationInfo.skip,
        take: paginationInfo.take,
      }),
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              UnitQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
      orderBy: BaseQuery.OrderBy.latest(),
      include: {
        createdBy: { select: { name: true } },
      },
    });
    return {
      data: units.map((unit) => ({
        ...unit,
        createdByName: unit.createdBy.name,
      })),
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<UnitResponseDto>> {
    const unit = await this.prismaService.unit.findFirstOrThrow({
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
      include: {
        createdBy: { select: { name: true } },
      },
    });
    return {
      data: unit,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUnitRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<UnitResponseDto>> {
    const productUnitCount = await this.prismaService.productUnit.count({
      where: BaseQuery.Filter.available(),
    });
    if (productUnitCount <= 0) {
      throw new BadRequestException({
        message: 'Cannot update unit as it has product units',
      });
    }
    const updatedUnit = await this.prismaService.unit.update({
      data: { ...data, updatedById: user.id },
      where: BaseQuery.Filter.byId(id),
      include: {
        createdBy: { select: { name: true } },
      },
    });
    return {
      data: updatedUnit,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    const productUnitCount = await this.prismaService.productUnit.count({
      where: BaseQuery.Filter.available(),
    });
    if (productUnitCount <= 0) {
      throw new BadRequestException({
        message: 'Cannot delete unit as it has product units',
      });
    }
    await this.prismaService.unit.update({
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
      include: {
        createdBy: { select: { name: true } },
      },
    });
  }
}
