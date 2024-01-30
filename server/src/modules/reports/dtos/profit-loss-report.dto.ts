export interface ProfitLossRecord {
  productName: string;
  unitName: string;
  quantity: number;
  costPrice: number;
  salePrice: number;
  discount: number;
  profit: number;
  createdAt: Date | string;
}

export interface ProfitLossReport {
  items: ProfitLossRecord[];
  costTotal: number;
  saleTotal: number;
  profitTotal: number;
}
