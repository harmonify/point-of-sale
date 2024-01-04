import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { SaleModule } from '../sale/sale.module';

@Module({
  imports: [SaleModule],
  controllers: [ReportController],
})
export class ReportModule {}
