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

import { ExpenseQuery } from './expense.query';
import {
  CreateExpenseRequestDto,
  ExpenseResponseDto,
  UpdateExpenseRequestDto,
} from './dtos';

@ApiTags('Expenses')
@Controller({ path: '/expenses', version: '1' })
export class ExpenseController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() expense: CreateExpenseRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ExpenseResponseDto>> {
    const newExpense = await this.prismaService.expense.create({
      data: {
        ...expense,
        createdById: user.id,
        updatedById: user.id,
      },
    });
    return {
      data: newExpense,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<ExpenseResponseDto[]>> {
    const expenses = await this.prismaService.expense.findMany({
      ...(!paginationInfo.all && {
        skip: paginationInfo.skip,
        take: paginationInfo.take,
      }),
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              ExpenseQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
      orderBy: BaseQuery.OrderBy.latest(),
    });
    return {
      data: expenses,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<ExpenseResponseDto>> {
    const expense = await this.prismaService.expense.findFirstOrThrow({
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
    });
    return {
      data: expense,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateExpenseRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ExpenseResponseDto>> {
    const updatedExpense = await this.prismaService.expense.update({
      data: { ...data, updatedById: user.id },
      where: BaseQuery.Filter.byId(id),
    });
    return {
      data: updatedExpense,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.prismaService.expense.update({
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
