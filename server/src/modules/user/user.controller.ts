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

import { UserQuery } from './user.query';
import {
  CreateUserRequestDto,
  UserResponseDto,
  UpdateUserRequestDto,
} from './dtos';

@ApiTags('Users')
@Controller({ path: '/users', version: '1' })
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async create(
    @Body() newUserDto: CreateUserRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<UserResponseDto>> {
    const newUser = await this.prismaService.user.create({
      data: {
        ...newUserDto,
        createdById: user.id,
        updatedById: user.id,
      },
    });
    return {
      data: newUser,
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<UserResponseDto[]>> {
    const users = await this.prismaService.user.findMany({
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              UserQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
      orderBy: BaseQuery.OrderBy.latest(),
    });
    return {
      data: users,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<UserResponseDto>> {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
    });
    return {
      data: user,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUserRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<UserResponseDto>> {
    const updatedUser = await this.prismaService.user.update({
      data: { ...data, updatedById: user.id },
      where: BaseQuery.Filter.byId(id),
    });
    return {
      data: updatedUser,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    if (id === user.id) {
      throw new BadRequestException('Cannot delete own account');
    }
    await this.prismaService.user.update({
      data: BaseQuery.softDelete(user.id),
      where: BaseQuery.Filter.byId(id),
    });
  }
}
