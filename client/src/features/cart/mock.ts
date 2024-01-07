import { CartState } from "."

export const mockCartState: CartState = {
  name: "Test Cart",
  description: "This guy bought egg and garnier uv white egg",
  inputDiscountTotal: 1000,
  discountTotalType: "FLAT",
  inputTaxTotal: 0,
  taxTotalType: "FLAT",
  paid: 100000,
  customerId: 1,
  items: {
    "1": {
      productUnitId: 1,
      name: "Egg",
      unitName: "Piece",
      salePrice: 1500,
      quantity: 10,
      inputDiscount: 500,
      discountType: "FLAT",
      inputTax: 0,
      taxType: "FLAT",
    },
    "2": {
      productUnitId: 2,
      name: "Garnier UV White Egg",
      unitName: "Dozen",
      salePrice: 15000,
      quantity: 1,
      inputDiscount: 20,
      discountType: "PERCENTAGE",
      inputTax: 0,
      taxType: "FLAT",
    },
  },
}
