import { CashFlowModule } from '@/modules/cash-flow/cash-flow.module';
import { Module } from '@nestjs/common';

import { ProcurementController } from './procurement.controller';
import { ProcurementService } from './procurement.service';

@Module({
  imports: [CashFlowModule],
  controllers: [ProcurementController],
  providers: [ProcurementService],
  exports: [ProcurementService],
})
export class ProcurementModule {}
