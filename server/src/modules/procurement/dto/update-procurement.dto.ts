
import {ProcurementDeliveryStatus,ProcurementPaymentStatus} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateProcurementRequestDto {
  deletedAt?: Date;
deletedById?: number;
name?: string;
invoiceNumber?: string;
invoiceDate?: Date;
@ApiProperty({ enum: ProcurementDeliveryStatus})
deliveryStatus?: ProcurementDeliveryStatus;
deliveredAt?: Date;
@ApiProperty({ enum: ProcurementPaymentStatus})
paymentStatus?: ProcurementPaymentStatus;
payedAt?: Date;
}
