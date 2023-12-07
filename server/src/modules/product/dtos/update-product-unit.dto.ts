export class UpdateProductUnitRequestDto {
  deletedById?: number;
  deletedAt?: Date;
  name?: string;
  description?: string;
  wholesalePrice?: number;
  sellingPrice?: number;
}
