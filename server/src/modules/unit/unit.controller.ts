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

import {
  CreateUnitRequestDto,
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
    });
    return {
      data: newUnit,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<UnitResponseDto[]>> {
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
    });
    return {
      data: units,
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
    const updatedUnit = await this.prismaService.unit.update({
      data: { ...data, updatedById: user.id },
      where: BaseQuery.Filter.byId(id),
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
    await this.prismaService.unit.update({
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
