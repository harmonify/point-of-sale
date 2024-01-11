// src/app.module.ts
import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { SaleModule } from '../sale/sale.module';

@Module({
  imports: [SaleModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
