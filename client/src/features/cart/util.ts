import currency from "currency.js"
import type {
  CartItemStateSummary,
  CartItemState,
  CartState,
  FlatOrPercentage,
  CartStateSummary,
} from "."

export interface CartItemSummary {
  subTotal: number
  discount: number
  tax: number
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
  subTotal: number,
  amount: number,
  type: FlatOrPercentage,
): number => {
  if (type === "PERCENTAGE") {
    return currency(subTotal).multiply(amount).divide(100).value
  } else {
    return amount
  }
}

export const getItemSummary = (cartItem: CartItemState): CartItemSummary => {
  const subTotal =
    Math.max(currency(cartItem.salePrice).multiply(cartItem.quantity).value, 0) || 0

  const discount =
    Math.max(
      countTaxOrDiscount(
        subTotal,
        cartItem.inputDiscount,
        cartItem.discountType,
      ),
      0,
    ) || 0

  const tax =
    Math.max(
      countTaxOrDiscount(subTotal, cartItem.inputTax, cartItem.taxType),
      0,
    ) || 0

  const total =
    Math.max(currency(subTotal).subtract(discount).add(tax).value, 0) || 0

  return {
    subTotal,
    discount,
    tax,
    total,
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
    return acc.add(itemSummary.total)
  }, currency(0.0))
  const subTotalValue = Math.max(subTotal.value, 0) || 0

  const discountTotal = countTaxOrDiscount(
    subTotalValue,
    cart.inputDiscountTotal,
    cart.discountTotalType,
  )
  const discountTotalValue = Math.max(discountTotal, 0) || 0

  const taxTotal = countTaxOrDiscount(
    subTotalValue,
    cart.inputTaxTotal,
    cart.taxTotalType,
  )
  const taxTotalValue = Math.max(taxTotal, 0) || 0

  const total = currency(subTotalValue)
    .subtract(discountTotalValue)
    .add(taxTotalValue)
  const totalValue = Math.max(total.value, 0) || 0

  const change = currency(cart.paid).subtract(totalValue)
  const changeValue = change.value || 0

  return {
    items: cartItemSummary,
    subTotal: subTotalValue,
    discountTotal: discountTotalValue,
    taxTotal: taxTotalValue,
    total: totalValue,
    change: changeValue,
  }
}

export const getCartStateWithSummary = (
  cartState: CartState,
): CartStateSummary => {
  const summary = getCartSummary(cartState)
  const result = {
    ...cartState,
    ...summary,
    items: Object.values(cartState.items).reduce((acc, item) => {
      if (item) {
        acc[item.productUnitId] = {
          ...item,
          ...summary.items[item.productUnitId],
        }
      }
      return acc
    }, {} as CartStateSummary["items"]),
  } satisfies CartStateSummary
  return result
}
