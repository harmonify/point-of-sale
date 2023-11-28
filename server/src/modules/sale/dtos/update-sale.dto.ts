export class UpdateSaleRequestDto {
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
