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
import { Customer, User } from '@prisma/client';

@ApiTags('Customers')
@Controller({ path: '/customers', version: '1' })
export class CustomerController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.prismaService.customer.findUniqueOrThrow({
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Get()
  findAll(@PaginationInfo() paginationInfo: RequestPaginationInfoDto) {
    return this.prismaService.customer.findMany({
      select: {
        ...PrismaService.DEFAULT_SELECT,
        name: true,
        phoneNumber: true,
        email: true,
        createdBy: { select: PrismaService.USER_DEFAULT_SELECT },
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
  }

  @Post()
  create(@Body() customer: Customer, @CurrentUser() user: User) {
    return this.prismaService.customer.create({
      data: {
        ...customer,
        createdById: user.id,
        updatedById: user.id,
      },
    });
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: Customer,
    @CurrentUser() user: User,
  ) {
    return this.prismaService.customer.update({
      data: { ...data, updatedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }

  @Delete('/:id')
  delete(@Param('id') id: number, @CurrentUser() user: User) {
    return this.prismaService.customer.update({
      data: { ...PrismaService.DEFAULT_SOFT_DELETE_DATA, deletedById: user.id },
      where: { id, ...PrismaService.DEFAULT_WHERE },
    });
  }
}
