import {
  IResponseBody,
  PaginationInfo,
  RequestPaginationInfoDto,
} from '@/libs/http';
import { CurrentUser } from '@/modules/auth';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { NotificationResponseDto } from './dtos';
import { NotificationService } from './notification.service';

@ApiTags('Notifications')
@Controller({ path: '/notifications', version: '1' })
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<NotificationResponseDto[]>> {
    const notifications = await this.notificationService.findAll(
      paginationInfo,
      user.id,
    );
    return {
      data: notifications,
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<NotificationResponseDto>> {
    const notification = await this.notificationService.findOne(id, user.id);
    return {
      data: notification,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.notificationService.dismiss(id, user.id);
    return;
  }
}
