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

import { ExpenseCategoryQuery } from './expense-category.query';
import {
  CreateExpenseCategoryRequestDto,
  ExpenseCategoryResponseDto,
  UpdateExpenseCategoryRequestDto,
} from './dtos';

@ApiTags('ExpenseCategories')
@Controller({ path: '/expense-categories', version: '1' })
export class ExpenseCategoryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() expenseCategory: CreateExpenseCategoryRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ExpenseCategoryResponseDto>> {
    const newExpenseCategory = await this.prismaService.expenseCategory.create({
      data: {
        ...expenseCategory,
        createdById: user.id,
        updatedById: user.id,
      },
    });
    return {
      data: newExpenseCategory,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<ExpenseCategoryResponseDto[]>> {
    const expenseCategories = await this.prismaService.expenseCategory.findMany(
      {
        ...(!paginationInfo.all && {
          skip: paginationInfo.skip,
          take: paginationInfo.take,
        }),
        where: paginationInfo.search
          ? {
              AND: [
                BaseQuery.Filter.available(),
                ExpenseCategoryQuery.Filter.search(paginationInfo.search),
              ],
            }
          : BaseQuery.Filter.available(),
        orderBy: BaseQuery.OrderBy.latest(),
      },
    );
    return {
      data: expenseCategories,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<ExpenseCategoryResponseDto>> {
    const expenseCategory =
      await this.prismaService.expenseCategory.findFirstOrThrow({
        where: {
          ...BaseQuery.Filter.available(),
          id,
        },
      });
    return {
      data: expenseCategory,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateExpenseCategoryRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ExpenseCategoryResponseDto>> {
    const updatedExpenseCategory =
      await this.prismaService.expenseCategory.update({
        data: { ...data, updatedById: user.id },
        where: BaseQuery.Filter.byId(id),
      });
    return {
      data: updatedExpenseCategory,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.expenseCategory.update({
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
