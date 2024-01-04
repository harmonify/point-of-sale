import { IResponseBody } from '@/libs/http';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReportService } from '../sale';
import { ProfitLossReport, SaleReport } from './dtos';

@ApiTags('Reports')
@Controller({ path: '/reports', version: '1' })
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('sales/daily')
  async getDailySales(): Promise<IResponseBody<SaleReport>> {
    const result = await this.reportService.getDailySalesReport();
    return {
      data: result,
    };
  }

  @Get('sales/monthly')
  async getMonthlySales(): Promise<IResponseBody<SaleReport>> {
    const result = await this.reportService.getMonthlySalesReport();
    return {
      data: result,
    };
  }

  @Get('sales/yearly')
  async getYearlySales(): Promise<IResponseBody<SaleReport>> {
    const result = await this.reportService.getYearlySalesReport();
    return {
      data: result,
    };
  }

  @Get('profit-loss')
  async getProfitLoss(): Promise<IResponseBody<ProfitLossReport>> {
    const result = await this.reportService.getProfitLossReport();
    return {
      data: result,
    };
  }
}
