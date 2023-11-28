export class UpdateExpenseRequestDto {
  deletedById?: number;
  deletedAt?: Date;
  description?: string;
  amount?: number;
  spentAt?: Date;
}
