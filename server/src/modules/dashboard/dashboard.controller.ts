import { IResponseBody } from '@/libs/http';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@Controller({ path: 'dashboard', version: '1' })
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @ApiOperation({ description: 'Get dashboard information' })
  @Get()
  async getDashboard(): Promise<IResponseBody> {
    return {
      data: await this.dashboardService.getDashboardInfo(),
    };
  }
}
