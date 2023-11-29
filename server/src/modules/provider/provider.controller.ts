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

import { ProviderQuery } from './provider.query';
import {
  CreateProviderRequestDto,
  ProviderResponseDto,
  UpdateProviderRequestDto,
} from './dtos';

@ApiTags('Providers')
@Controller({ path: '/providers', version: '1' })
export class ProviderController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() provider: CreateProviderRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProviderResponseDto>> {
    const newProvider = await this.prismaService.provider.create({
      data: {
        ...provider,
        createdById: user.id,
        updatedById: user.id,
      },
    });
    return {
      data: newProvider,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<ProviderResponseDto[]>> {
    const providers = await this.prismaService.provider.findMany({
      select: ProviderQuery.Field.default(),
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              ProviderQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
      orderBy: BaseQuery.OrderBy.latest(),
    });
    return {
      data: providers,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<ProviderResponseDto>> {
    const provider = await this.prismaService.provider.findUniqueOrThrow({
      select: ProviderQuery.Field.default(),
      where: {
        id,
        AND: [BaseQuery.Filter.available()],
      },
    });
    return {
      data: provider,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProviderRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProviderResponseDto>> {
    const updatedProvider = await this.prismaService.provider.update({
      data: { ...data, updatedById: user.id },
      where: BaseQuery.Filter.byId(id),
    });
    return {
      data: updatedProvider,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.provider.update({
      data: BaseQuery.getSoftDeleteData(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
