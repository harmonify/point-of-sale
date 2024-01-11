const saleProductDataMock = {
  id: 11,
  isActive: true,
  createdAt: "2024-01-07T13:42:11.674Z",
  updatedAt: "2024-01-07T13:42:11.674Z",
  deletedAt: null,
  createdById: 1,
  updatedById: 1,
  deletedById: null,
  saleId: 10,
  productUnitId: 1,
  productName: "Egg",
  unitName: "Piece",
  costPrice: 100,
  salePrice: 1000,
  quantity: 1,
  subTotal: 1000,
  inputDiscount: 0,
  discountType: "FLAT",
  discount: 0,
  inputTax: 0,
  taxType: "FLAT",
  tax: 0,
  total: 1000,
}

export const invoiceDataMock = {
  id: 10,
  isActive: true,
  createdAt: "2024-01-07T13:42:11.674Z",
  updatedAt: "2024-01-07T13:42:11.674Z",
  deletedAt: null,
  createdById: 1,
  updatedById: 1,
  deletedById: null,
  customerId: null,
  invoiceNumber: "20240107105",
  name: null,
  description: null,
  note: null,
  isNoteVisible: false,
  subTotal: 100,
  inputDiscountTotal: 1000,
  discountTotalType: "FLAT",
  discountTotal: 1000,
  inputTaxTotal: 0,
  taxTotalType: "FLAT",
  taxTotal: 0,
  total: 9000,
  paid: 10000,
  change: 1000,
  customer: {
    id: 1,
    name: "John Doe",
  },
  createdBy: {
    name: "Admin User",
  },
  saleProducts: Array.from({ length: 5 }, (_) => saleProductDataMock),
}
