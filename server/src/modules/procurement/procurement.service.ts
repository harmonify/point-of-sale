import { RequestPaginationInfoDto } from '@/libs/http';
import { BaseQuery } from '@/libs/prisma';
import { CashFlowService } from '@/modules/cash-flow';
import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Procurement,
  ProcurementDeliveryStatus,
  ProcurementPaymentStatus,
  User,
} from '@prisma/client';
import _ from 'lodash';
import { PrismaService } from 'nestjs-prisma';

import {
  CreateProcurementRequestDto,
  ProcurementResponseDto,
  UpdateProcurementProductRequestDto,
  UpdateProcurementRequestDto,
} from './dtos';
import { ProcurementQuery } from './procurement.query';

@Injectable()
export class ProcurementService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cashFlowService: CashFlowService,
  ) {}

  async create(
    data: CreateProcurementRequestDto,
    authorId: User['id'],
  ): Promise<ProcurementResponseDto> {
    return this.prismaService.$transaction(async (prisma) => {
      const procurement = await prisma.procurement.create({
        data: {
          ...data,
          createdById: authorId,
          updatedById: authorId,
          procurementProducts: {
            createMany: {
              data: data.procurementProducts.map((pp) => ({
                ...pp,
                createdById: authorId,
                updatedById: authorId,
                isActive:
                  data.deliveryStatus === ProcurementDeliveryStatus.DELIVERED, // Only activate the product new stock if the procurement status is delivered
              })),
            },
          },
        },
        include: {
          procurementProducts: true,
          supplier: { select: { name: true } },
          createdBy: { select: { name: true } },
        },
      });

      if (data.paymentStatus === ProcurementPaymentStatus.PAID) {
        await this.cashFlowService.upsertProcurementCashFlow(
          procurement,
          authorId,
          prisma,
        );
      }

      return procurement;
    });
  }

  async update(
    id: number,
    data: UpdateProcurementRequestDto,
    authorId: User['id'],
  ): Promise<ProcurementResponseDto> {
    return this.prismaService.$transaction(async (prisma) => {
      const {
        procurementProducts: procurementProductInputs,
        ...procurementInput
      } = data;

      const updatedProcurement = await prisma.procurement.update({
        data: {
          ...procurementInput,
          updatedById: authorId,
        },
        where: { id },
        include: {
          procurementProducts: true,
          supplier: { select: { name: true } },
          createdBy: { select: { name: true } },
        },
      });

      await this.syncProcurementProducts(
        updatedProcurement,
        procurementProductInputs,
        authorId,
        prisma,
      );

      if (data.paymentStatus === ProcurementPaymentStatus.PAID) {
        await this.cashFlowService.upsertProcurementCashFlow(
          updatedProcurement,
          authorId,
          prisma,
        );
      }

      return updatedProcurement;
    });
  }

  async syncProcurementProducts(
    procurement: Procurement,
    data: UpdateProcurementProductRequestDto[],
    authorId: User['id'],
    prisma?: Prisma.TransactionClient,
  ): Promise<void> {
    const prismaClient = prisma || this.prismaService;

    const isProcurementProductActive =
      procurement.deliveryStatus === ProcurementDeliveryStatus.DELIVERED;

    const existingProcurementProducts =
      await prismaClient.procurementProduct.findMany({
        where: {
          ...BaseQuery.Filter.available(),
          procurementId: procurement.id,
        },
      });

    const [newProcurementProductInputs, updatedProcurementProductInputs] =
      _.partition(data, (pp) => pp.id == undefined);

    // Create new procurement products
    if (newProcurementProductInputs.length > 0) {
      await prismaClient.procurementProduct.createMany({
        data: newProcurementProductInputs.map((pp) => ({
          ...pp,
          isActive: isProcurementProductActive,
          createdById: authorId,
          updatedById: authorId,
          procurementId: procurement.id,
        })),
      });
    }

    // Delete the old procurement products
    const deletedProcurementProducts = _.differenceBy(
      existingProcurementProducts,
      updatedProcurementProductInputs,
      (val) => val.id,
    );
    if (deletedProcurementProducts.length > 0) {
      await prismaClient.procurementProduct.updateMany({
        data: BaseQuery.softDelete(authorId),
        where: {
          id: { in: deletedProcurementProducts.map((pp) => pp.id) },
        },
      });
    }

    // Update the procurement products
    if (updatedProcurementProductInputs.length > 0) {
      await BaseQuery.partitionQuery(updatedProcurementProductInputs, (pp) =>
        prismaClient.procurementProduct.update({
          data: {
            ...pp,
            isActive: isProcurementProductActive,
            updatedById: authorId,
            procurementId: procurement.id,
          },
          where: {
            id: pp.id,
          },
        }),
      );
    }
  }

  findAll(
    paginationInfo: RequestPaginationInfoDto,
  ): Promise<ProcurementResponseDto[]> {
    return this.prismaService.procurement.findMany({
      ...(!paginationInfo.all && {
        skip: paginationInfo.skip,
        take: paginationInfo.take,
      }),
      where: paginationInfo.search
        ? {
            AND: [
              BaseQuery.Filter.available(),
              ProcurementQuery.Filter.search(paginationInfo.search),
            ],
          }
        : BaseQuery.Filter.available(),
      include: {
        procurementProducts: true,
        supplier: { select: { name: true } },
        createdBy: { select: { name: true } },
      },
      orderBy: BaseQuery.OrderBy.latest(),
    });
  }

  findOne(id: number): Promise<ProcurementResponseDto> {
    return this.prismaService.procurement.findFirstOrThrow({
      include: {
        procurementProducts: true,
        supplier: { select: { name: true } },
        createdBy: { select: { name: true } },
      },
      where: {
        ...BaseQuery.Filter.available(),
        id,
      },
    });
  }

  softDelete(id: number, authorId: User['id']): Promise<void> {
    return this.prismaService.$transaction(async (prisma) => {
      const procurement = await prisma.procurement.update({
        data: BaseQuery.softDelete(authorId),
        where: { id },
      });
      await prisma.procurementProduct.updateMany({
        data: BaseQuery.softDelete(authorId),
        where: { procurementId: id },
      });
      await this.cashFlowService.softDeleteProcurementCashFlow(
        procurement.id,
        authorId,
        prisma,
      );
    });
  }
}
