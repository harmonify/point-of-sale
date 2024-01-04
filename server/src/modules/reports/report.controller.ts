import { IResponseBody } from '@/libs/http';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'nestjs-prisma';

import { SaleService } from '../sale';
import { SaleReport } from './dtos';

@ApiTags('Reports')
@Controller({ path: '/reports', version: '1' })
export class ReportController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly saleService: SaleService,
  ) {}

  @Get('sales/daily')
  async getDailySales(): Promise<IResponseBody<SaleReport>> {
    const result = await this.saleService.getDailySalesReport();
    return {
      data: result,
    };
  }

  @Get('sales/monthly')
  async getMonthlySales(): Promise<IResponseBody<SaleReport>> {
    const result = await this.saleService.getMonthlySalesReport();
    return {
      data: result,
    };
  }

  @Get('sales/yearly')
  async getYearlySales(): Promise<IResponseBody<SaleReport>> {
    const result = await this.saleService.getYearlySalesReport();
    return {
      data: result,
    };
  }
}
