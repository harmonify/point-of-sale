import { IResponseBody } from '@/libs/http';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReportService } from '../sale';
import { ProfitLossReport, SaleReport } from './dtos';

@ApiTags('Reports')
@Controller({ path: '/reports', version: '1' })
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('sales')
  async getSalesReport(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<IResponseBody<SaleReport>> {
    const result = await this.reportService.getSalesReport(from, to);
    return {
      data: result,
    };
  }

  @Get('sales/daily')
  async getDailySalesReport(): Promise<IResponseBody<SaleReport>> {
    const result = await this.reportService.getDailySalesReport();
    return {
      data: result,
    };
  }

  @Get('sales/monthly')
  async getMonthlySalesReport(): Promise<IResponseBody<SaleReport>> {
    const result = await this.reportService.getMonthlySalesReport();
    return {
      data: result,
    };
  }

  @Get('sales/yearly')
  async getYearlySalesReport(): Promise<IResponseBody<SaleReport>> {
    const result = await this.reportService.getYearlySalesReport();
    return {
      data: result,
    };
  }

  @Get('profit-loss')
  async getProfitLossReport(): Promise<IResponseBody<ProfitLossReport>> {
    const result = await this.reportService.getProfitLossReport();
    return {
      data: result,
    };
  }
}
