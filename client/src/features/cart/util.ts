import currency from "currency.js"
import {
  CartItemStateSummary,
  CartItemState,
  CartState,
  FlatOrPercentage,
} from "."

export interface CartItemSummary {
  subTotalObj: currency
  subTotal: number
  discount: number
  tax: number
  totalObj: currency
  total: number
}

export interface CartSummary {
  items: { [productUnitId: number | string]: CartItemSummary }
  subTotal: number
  discountTotal: number
  taxTotal: number
  total: number
  change: number
}

/** @private */
const countTaxOrDiscount = (
  subTotal: currency,
  amount: number,
  type: FlatOrPercentage,
): number => {
  return type === "flat" ? amount : subTotal.multiply(amount).value
}

export const getItemSummary = (cartItem: CartItemState): CartItemSummary => {
  const subTotal = currency(cartItem.price).multiply(cartItem.quantity)
  const discount = countTaxOrDiscount(
    subTotal,
    cartItem.inputDiscount,
    cartItem.discountType,
  )
  const tax = countTaxOrDiscount(subTotal, cartItem.inputTax, cartItem.taxType)
  const total = subTotal.subtract(discount).add(tax)

  return {
    subTotalObj: subTotal,
    subTotal: Math.max(subTotal.value, 0),
    discount: Math.max(discount, 0),
    tax: Math.max(tax, 0),
    totalObj: total,
    total: Math.max(total.value, 0),
  }
}

export const getCartSummary = (cart: CartState): CartSummary => {
  const cartItems: CartItemState[] = Object.values(cart.items).filter((value) =>
    Boolean(value),
  ) as CartItemState[]

  const cartItemSummary: { [productUnitId: number | string]: CartItemSummary } =
    {}

  const subTotal = cartItems.reduce((acc, cartItem) => {
    const itemSummary = getItemSummary(cartItem)
    cartItemSummary[cartItem.productUnitId] = itemSummary
    return acc.add(itemSummary.totalObj)
  }, currency(0.0))
  const subTotalValue = Math.max(subTotal.value, 0)

  const discountTotal = countTaxOrDiscount(
    subTotal,
    cart.inputDiscountTotal,
    cart.discountTotalType,
  )
  const discountTotalValue = Math.max(discountTotal, 0)

  const taxTotal = countTaxOrDiscount(
    subTotal,
    cart.inputTaxTotal,
    cart.taxTotalType,
  )
  const taxTotalValue = Math.max(taxTotal, 0)

  const total = currency(subTotal).subtract(discountTotal).add(taxTotal)
  const totalValue = Math.max(total.value, 0)

  const change = currency(cart.paid).subtract(total)
  const changeValue = Math.max(change.value, 0)

  return {
    items: cartItemSummary,
    subTotal: subTotalValue,
    discountTotal: discountTotalValue,
    taxTotal: taxTotalValue,
    total: totalValue,
    change: changeValue,
  }
}
