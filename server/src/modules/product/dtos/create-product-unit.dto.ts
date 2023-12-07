export class CreateProductUnitRequestDto {
  deletedById?: number;
  deletedAt?: Date;
  name: string;
  description?: string;
  wholesalePrice: number;
  sellingPrice: number;
}
