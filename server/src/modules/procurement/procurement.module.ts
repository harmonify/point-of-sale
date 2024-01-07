import { CashFlowModule } from '@/modules/cash-flow/cash-flow.module';
import { Module } from '@nestjs/common';

import { ProcurementController } from './procurement.controller';
import { ProcurementService } from './procurement.service';
import { ProductModule } from '../product/product.module';
import { ProcurementProductController } from './procurement-product.controller';

@Module({
  imports: [CashFlowModule, ProductModule],
  controllers: [ProcurementController, ProcurementProductController],
  providers: [ProcurementService],
  exports: [ProcurementService],
})
export class ProcurementModule {}
