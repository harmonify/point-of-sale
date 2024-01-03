import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { getCartStateWithSummary, getCartSummary } from "./util"
import { mockCartState } from "./mock"

export type FlatOrPercentage = "FLAT" | "PERCENTAGE"

export interface CartCustomerState {
  id: number | null
  name: string | null
}

export interface CartItemState {
  productUnitId: number
  name: string
  unitName: string
  price: number
  quantity: number
  inputDiscount: number
  discountType: FlatOrPercentage
  inputTax: number
  taxType: FlatOrPercentage
}

export interface CartState {
  items: {
    [productUnitId: number | string]: CartItemState | null | undefined
  }
  name: string | null
  customer: CartCustomerState | null
  inputDiscountTotal: number
  discountTotalType: FlatOrPercentage
  inputTaxTotal: number
  taxTotalType: FlatOrPercentage
  /** Amount of money that the customer paid */
  paid: number
}

export interface CartItemStateSummary extends CartItemState {
  subTotal: number
  /** Final discount of the item */
  discount: number
  /** Final tax of the item */
  tax: number
  total: number
}

/** Cart state with summary */
export interface CartStateSummary extends Omit<CartState, "items"> {
  items: {
    [productUnitId: number | string]: CartItemStateSummary
  }
  subTotal: number
  /** Final discount of the cart */
  discountTotal: number
  /** Final tax of the cart */
  taxTotal: number
  /** The final amount of money to pay */
  total: number
  /** Amount of money to return to customer */
  change: number
}

const initialState: CartState = {
  items: {},
  name: null,
  customer: null,
  inputDiscountTotal: 0.0,
  discountTotalType: "PERCENTAGE",
  inputTaxTotal: 0.0,
  taxTotalType: "PERCENTAGE",
  paid: 0.0,
} satisfies CartState

const upsertCartItemReducer = (
  state: CartState,
  { payload: cartItem }: PayloadAction<CartItemState>,
) => {
  const isNewUniqueCartItem = !Boolean(state.items[cartItem.productUnitId])
  const quantity = isNewUniqueCartItem
    ? cartItem.quantity
    : state.items[cartItem.productUnitId]
    ? state.items[cartItem.productUnitId]!.quantity + cartItem.quantity
    : cartItem.quantity
  const updatedCartItem = {
    ...state.items[cartItem.productUnitId],
    ...cartItem,
    quantity,
  }
  // logger.debug(
  //   `🚀 ~ {isNewUniqueCartItem, quantity, updatedCartItem, state.items[cartItem.productUnitId]} ~ ${JSON.stringify(
  //     {
  //       isNewUniqueCartItem,
  //       quantity,
  //       updatedCartItem,
  //       "state.items[cartItem.productUnitId]":
  //         state.items[cartItem.productUnitId],
  //     },
  //     null,
  //     2,
  //   )}`,
  // )
  state.items[cartItem.productUnitId] = updatedCartItem
}

const setCartCustomerReducer = (
  state: CartState,
  { payload: customer }: PayloadAction<CartCustomerState>,
) => {
  state.customer = customer
}

const updateCartItemPriceReducer = (
  state: CartState,
  { payload }: PayloadAction<{ productUnitId: number | string; price: number }>,
) => {
  if (state.items[payload.productUnitId]) {
    state.items[payload.productUnitId]!.price = payload.price
  }
}

const updateCartItemQuantityReducer = (
  state: CartState,
  {
    payload,
  }: PayloadAction<{ productUnitId: number | string; quantity: number }>,
) => {
  if (state.items[payload.productUnitId]) {
    state.items[payload.productUnitId]!.quantity = payload.quantity
  }
}

const updateCartItemDiscountReducer = (
  state: CartState,
  {
    payload,
  }: PayloadAction<{
    productUnitId: number | string
    inputDiscount: number
    discountType: FlatOrPercentage
  }>,
) => {
  if (state.items[payload.productUnitId]) {
    const item = state.items[payload.productUnitId]!
    item.inputDiscount = payload.inputDiscount
    item.discountType = payload.discountType
  }
}

const updateCartItemTaxReducer = (
  state: CartState,
  {
    payload,
  }: PayloadAction<{
    productUnitId: number | string
    inputTax: number
    taxType: FlatOrPercentage
  }>,
) => {
  if (state.items[payload.productUnitId]) {
    const item = state.items[payload.productUnitId]!
    item.inputTax = payload.inputTax
    item.taxType = payload.taxType
  }
}

const removeCartItemReducer = (
  state: CartState,
  { payload: productUnitId }: PayloadAction<number | string>,
): void => {
  delete state.items[productUnitId]
}

const updateCartDiscountTotalReducer = (
  state: CartState,
  {
    payload,
  }: PayloadAction<{
    inputDiscountTotal: number
    discountTotalType: FlatOrPercentage
  }>,
) => {
  state.inputDiscountTotal = payload.inputDiscountTotal
  state.discountTotalType = payload.discountTotalType
}

const updateCartTaxTotalReducer = (
  state: CartState,
  {
    payload,
  }: PayloadAction<{ inputTaxTotal: number; taxTotalType: FlatOrPercentage }>,
) => {
  state.inputTaxTotal = payload.inputTaxTotal
  state.taxTotalType = payload.taxTotalType
}

const updateCartPaidAmountReducer = (
  state: CartState,
  { payload: amount }: PayloadAction<number>,
) => {
  state.paid = amount
}

const emptyCartReducer = (oldState: CartState) => {
  oldState = Object.assign({}, initialState)
  oldState.items = Object.assign({}, initialState.items)
}

const slice = createSlice({
  name: "cart",
  initialState: mockCartState,
  reducers: {
    setCartCustomer: setCartCustomerReducer,
    upsertCartItem: upsertCartItemReducer,
    updateCartItemPrice: updateCartItemPriceReducer,
    updateCartItemQuantity: updateCartItemQuantityReducer,
    updateCartItemDiscount: updateCartItemDiscountReducer,
    updateCartItemTax: updateCartItemTaxReducer,
    removeCartItem: removeCartItemReducer,
    updateCartDiscountTotal: updateCartDiscountTotalReducer,
    updateCartTaxTotal: updateCartTaxTotalReducer,
    updateCartPaidAmount: updateCartPaidAmountReducer,
    emptyCart: emptyCartReducer,
  },
})

export const {
  setCartCustomer,
  upsertCartItem,
  updateCartItemPrice,
  updateCartItemQuantity,
  updateCartItemDiscount,
  updateCartItemTax,
  removeCartItem,
  updateCartDiscountTotal,
  updateCartTaxTotal,
  updateCartPaidAmount,
  emptyCart,
} = slice.actions

export const selectRawCart = (state: RootState): CartState => {
  return state.cart
}

export const selectCart = createSelector(
  [selectRawCart],
  (cartState: CartState): CartStateSummary => {
    return getCartStateWithSummary(cartState)
  },
)

export default slice.reducer
