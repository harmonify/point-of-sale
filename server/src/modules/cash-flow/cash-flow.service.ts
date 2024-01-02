import { Injectable } from '@nestjs/common';
import {
  CashFlow,
  CashFlowOperation,
  Prisma,
  Procurement,
  Sale,
  User,
} from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { BaseQuery } from '@/libs/prisma';

@Injectable()
export class CashFlowService {
  constructor(private readonly prismaService: PrismaService) {}

  async upsertProcurementCashFlow(
    procurement: Prisma.ProcurementGetPayload<{
      include: { procurementProducts: true };
    }>,
    authorId: User['id'],
    prisma?: Prisma.TransactionClient,
  ): Promise<CashFlow> {
    const prismaClient = prisma || this.prismaService;

    const cashFlow = await prismaClient.cashFlow.findFirst({
      where: {
        ...BaseQuery.Filter.available(),
        procurementId: procurement.id,
      },
    });

    const baseDto = {
      name: `Procurement: ${procurement.name}`,
      amount: procurement.procurementProducts.reduce(
        (acc, pp) => acc + pp.price * pp.quantity,
        0,
      ),
      operation: CashFlowOperation.DEBIT,
      updatedById: authorId,
      procurementId: procurement.id,
    };

    if (cashFlow) {
      return prismaClient.cashFlow.update({
        data: baseDto,
        where: {
          id: cashFlow.id,
        },
      });
    } else {
      return prismaClient.cashFlow.create({
        data: {
          ...baseDto,
          createdById: authorId,
        },
      });
    }
  }

  async upsertSaleCashFlow(
    sale: Sale,
    authorId: User['id'],
    prisma?: Prisma.TransactionClient,
  ): Promise<CashFlow> {
    const prismaClient = prisma || this.prismaService;

    const cashFlow = await prismaClient.cashFlow.findFirst({
      where: {
        ...BaseQuery.Filter.available(),
        saleId: sale.id,
      },
    });

    const baseDto = {
      name: `Sale: ${sale.name}`,
      amount: sale.total || 0,
      operation: CashFlowOperation.CREDIT,
      updatedById: authorId,
      saleId: sale.id,
    };

    if (cashFlow) {
      return prismaClient.cashFlow.update({
        data: baseDto,
        where: {
          id: cashFlow.id,
        },
      });
    } else {
      return prismaClient.cashFlow.create({
        data: {
          ...baseDto,
          createdById: authorId,
        },
      });
    }
  }

  async softDeleteProcurementCashFlow(
    procurementId: Procurement['id'],
    authorId: User['id'],
    prisma?: Prisma.TransactionClient,
  ) {
    const prismaClient = prisma || this.prismaService;
    return prismaClient.cashFlow.updateMany({
      data: BaseQuery.softDelete(authorId),
      where: {
        ...BaseQuery.Filter.available(),
        procurementId,
      },
    });
  }

  async softDeleteSaleCashFlow(
    saleId: Sale['id'],
    authorId: User['id'],
    prisma?: Prisma.TransactionClient,
  ) {
    const prismaClient = prisma || this.prismaService;
    return prismaClient.cashFlow.updateMany({
      data: BaseQuery.softDelete(authorId),
      where: {
        ...BaseQuery.Filter.available(),
        saleId,
      },
    });
  }
}
