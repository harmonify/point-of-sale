import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { SaleGateway } from './sale.gateway';

@Module({
  controllers: [SaleController],
  providers: [SaleService, SaleGateway],
  exports: [SaleService],
})
export class SaleModule {}
