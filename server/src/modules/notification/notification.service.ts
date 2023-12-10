import { BaseQuery } from '@/libs/prisma';
import { Injectable } from '@nestjs/common';
import { Notification, Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { CreateNotificationRequestDto } from './dtos';
import { NotificationNotDismissableException } from './exceptions';
import { NotificationQuery } from './notification.query';
import { RequestPaginationInfoDto } from '@/libs/http';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notificationDto: CreateNotificationRequestDto) {
    return this.prismaService.notification.create({
      data: notificationDto,
    });
  }

  findAll(paginationInfo: RequestPaginationInfoDto, userId: User['id']) {
    const where: Prisma.NotificationWhereInput = {
      AND: [BaseQuery.Filter.available(), { userId }],
    };

    if (paginationInfo.search) {
      (where.AND as Prisma.NotificationWhereInput[]).push(
        NotificationQuery.Filter.search(paginationInfo.search),
      );
    }

    return this.prismaService.notification.findMany({
      skip: paginationInfo.skip,
      take: paginationInfo.take,
      where,
      orderBy: BaseQuery.OrderBy.latest(),
    });
  }

  findOneAdmin(notificationId: Notification['id']) {
    return this.prismaService.notification.findFirstOrThrow({
      where: {
        ...BaseQuery.Filter.available(),
        id: notificationId,
      },
    });
  }

  findOne(notificationId: Notification['id'], userId: User['id']) {
    return this.prismaService.notification.findFirstOrThrow({
      where: {
        ...BaseQuery.Filter.available(),
        id: notificationId,
        userId,
      },
    });
  }

  /**
   * Dismiss the notification
   */
  async dismiss(notificationId: Notification['id'], userId: User['id']) {
    const notification = await this.findOne(notificationId, userId);

    if (!notification.dismissable) {
      throw new NotificationNotDismissableException();
    }

    return this.prismaService.notification.update({
      data: { isActive: false },
      where: { id: notificationId },
    });
  }
}
