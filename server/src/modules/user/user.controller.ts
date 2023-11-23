import { PaginationInfo, RequestPaginationInfoDto } from '@/libs/http';
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

@ApiTags('User')
@Controller({ path: '/user', version: '1' })
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Get()
  async findAll(@PaginationInfo() paginationInfo: RequestPaginationInfoDto) {
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
    return users.map((user) => ({
      ...user,
      createdBy: user.createdBy ? user.createdBy : { name: 'SYSTEM' },
      updatedBy: user.createdBy ? user.createdBy : { name: 'SYSTEM' },
    }));
  }

  @Post()
  create(@Body() data: User, @CurrentUser() user: User) {
    return this.prismaService.user.create({
      data: {
        ...data,
        createdById: user.id,
        updatedById: user.id,
      },
    });
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: User,
    @CurrentUser() user: User,
  ) {
    return this.prismaService.user.update({
      data: { ...data, updatedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Delete('/:id')
  delete(@Param('id') id: number, @CurrentUser() user: User) {
    if (id === user.id) {
      throw new BadRequestException('Cannot delete own account.');
    }
    return this.prismaService.user.update({
      data: {
        ...PrismaService.DEFAULT_SOFT_DELETE_DATA,
        blockReason: 'Blocked by admin.',
        deletedById: user.id,
      },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }
}
