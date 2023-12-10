import { Prisma } from '@prisma/client';

export class UpdateSaleRequestDto implements Prisma.SaleUpdateInput {
  deletedAt?: Date;
  discountOnItems?: number;
  discountOnTotal?: number;
  tax?: number;
  taxPercentageString?: string;
  netAmount?: number;
  amountPaid?: number;
  comments?: string;
  deletedById?: number;
}
