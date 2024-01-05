import { CartState, CartStateSummary, selectCart } from "@/features/cart"
import { getCartStateWithSummary } from "@/features/cart/util"

export const buildCreateSaleRequestDto = (
  cartState: CartState,
): Monorepo.Api.Request.CreateSaleRequestDto => {
  const cart = getCartStateWithSummary(cartState)

  return {
    saleProducts: Object.values(cart.items).map((cartItem) => {
      return {
        productUnitId: cartItem.productUnitId,
        salePrice: cartItem.salePrice,
        quantity: cartItem.quantity,
        subTotal: cartItem.subTotal,
        inputDiscount: cartItem.inputDiscount,
        discountType: cartItem.discountType,
        discount: cartItem.discount,
        inputTax: cartItem.inputTax,
        taxType: cartItem.taxType,
        tax: cartItem.tax,
        total: cartItem.total,
      }
    }),
    name: cart.name || null,
    description: cart.description || null,
    customerId: cart.customerId || null,
    subTotal: cart.subTotal,
    inputDiscountTotal: cart.inputDiscountTotal,
    discountTotalType: cart.discountTotalType,
    discountTotal: cart.discountTotal,
    inputTaxTotal: cart.inputTaxTotal,
    taxTotalType: cart.taxTotalType,
    taxTotal: cart.taxTotal,
    total: cart.total,
    paid: cart.paid,
    change: cart.change,
  }
}
