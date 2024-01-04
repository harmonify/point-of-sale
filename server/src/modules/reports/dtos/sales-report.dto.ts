export interface SaleProductRecord {
  categoryName: string;
  barcode?: string;
  productName: string;
  unitName: string;
  salePrice: number;
  quantity: number;
  discount: number;
  total: number;
  createdAt: string | Date;
}

export interface SaleReport {
  saleProducts: SaleProductRecord[];
  /** Sub total of all sale products */
  subTotal: number;
  discountTotal: number;
  taxTotal: number;
  total: number;
}
