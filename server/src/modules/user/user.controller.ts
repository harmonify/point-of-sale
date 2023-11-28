import {
  IResponseBody,
  PaginationInfo,
  RequestPaginationInfoDto,
} from '@/libs/http';
import { PrismaService } from '@/libs/prisma';
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
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from './dtos';

@ApiTags('Users')
@Controller({ path: '/users', version: '1' })
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<UserResponseDto>> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
    return { data: user };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<UserResponseDto[]>> {
    const users = await this.prismaService.user.findMany({
      select: {
        ...PrismaService.DEFAULT_SELECT,
        ...PrismaService.USER_DEFAULT_SELECT,
        createdBy: { select: PrismaService.USER_DEFAULT_SELECT },
        updatedBy: { select: PrismaService.USER_DEFAULT_SELECT },
      },
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where: {
        ...PrismaService.DEFAULT_WHERE,
        OR: paginationInfo.search
          ? [
              { name: { contains: paginationInfo.search } },
              { email: { contains: paginationInfo.search } },
              { phoneNumber: { contains: paginationInfo.search } },
            ]
          : [],
      },
      orderBy: PrismaService.ORDER_BY_LATEST,
    });

    return {
      data: users,
    };
  }

  @Post()
  async create(
    @Body() data: CreateUserRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<UserResponseDto>> {
    const newUser = await this.prismaService.user.create({
      data: {
        ...data,
        createdById: user.id,
        updatedById: user.id,
      },
    });
    return { data: newUser };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUserRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<UserResponseDto>> {
    const updatedUser = await this.prismaService.user.update({
      data: { ...data, updatedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
    return { data: updatedUser };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    if (id === user.id) {
      throw new BadRequestException('Cannot delete own account.');
    }
    await this.prismaService.user.update({
      data: {
        ...PrismaService.DEFAULT_SOFT_DELETE_DATA,
        blockReason: 'Blocked by admin.',
        deletedById: user.id,
      },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
    return;
  }
}
