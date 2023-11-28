export class CreateExpenseRequestDto {
  deletedById?: number;
  deletedAt?: Date;
  description: string;
  amount: number;
  spentAt: Date;
}
