import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import currency from "currency.js"

export interface CartItemState {
  id: number
  name: string
  qty: number
  price: number
  discount: number
  discountTotal: number
  sellingPrice: number
  totalPrice: number
}

export interface CartState {
  items: Record<string | number, CartItemState>
  summary: {
    noOfItems: number
    noOfInividualItems: number
    tax: number
    taxAmount: number
    discountOnTotal: number
    discountOnItems: number
    total: number // With discount on items
    netTotal: number // Net - (tax + discount on total)
  }
}

const initialState = {
  items: {},
  summary: {
    noOfItems: 0,
    noOfInividualItems: 0,
    tax: 0,
    // TODO
    // taxAmount: "0.00",
    taxAmount: 0.0,
    discountOnTotal: 0.0,
    discountOnItems: 0.0,
    total: 0.0, // With discount on items
    netTotal: 0.0, // Net - (tax + discount on total)
  },
} as CartState

const cloneObj = (state: CartState): CartState => {
  const clone = {
    items: {},
    summary: {},
  } as CartState

  Object.assign(clone.items, state.items)
  Object.assign(clone.summary, state.summary)

  return clone
}

const setCartItem = (state: CartState, item: CartItemState) => {
  // @ts-ignore eslint-disable-next-line no-param-reassign
  state.items[item.id] = {}

  const newItem = state.items[item.id]
  newItem.id = item.id
  newItem.name = item.name
  newItem.qty = item.qty
  newItem.price = currency(item.price).value
  newItem.discount = currency(item.discount).value
  newItem.discountTotal = currency(item.discount).multiply(item.qty).value

  // This will be the price shown in the cart gridview.
  newItem.sellingPrice = currency(item.price).subtract(newItem.discount).value

  // This is the total price on each item in cart gridview.
  newItem.totalPrice = currency(newItem.sellingPrice).multiply(item.qty).value
}

const updateCartItemReducer = (
  oldState: CartState,
  action: PayloadAction<CartItemState>,
) => {
  const item = action.payload

  const state = cloneObj(oldState)
  setCartItem(state, item)

  // Subtract the old stuff from state to nullify.
  const { summary } = state
  const oldItem = oldState.items[item.id]
  const newItem = state.items[item.id]

  summary.noOfInividualItems =
    summary.noOfInividualItems + newItem.qty - oldItem.qty

  summary.discountOnItems = currency(summary.discountOnItems)
    .add(newItem.discountTotal)
    .subtract(oldItem.discountTotal).value

  summary.total = currency(summary.total)
    .add(newItem.totalPrice)
    .subtract(oldItem.totalPrice).value

  const totalAfterDiscountOnTotal = currency(summary.total).subtract(
    summary.discountOnTotal,
  )

  summary.taxAmount = totalAfterDiscountOnTotal.multiply(
    summary.tax * 0.01,
  ).value

  summary.netTotal = totalAfterDiscountOnTotal.subtract(summary.taxAmount).value

  return state
}

const addItemToCartReducer = (
  oldState: CartState,
  action: PayloadAction<CartItemState>,
) => {
  const item = action.payload
  const state = cloneObj(oldState)

  setCartItem(state, item)

  // setCartItem adds the new item to the state. So the assignment below holds the new added item.
  const newItem = state.items[item.id]

  // Summary updates
  const { summary } = state

  summary.noOfItems++
  summary.noOfInividualItems += newItem.qty

  summary.discountOnItems = currency(summary.discountOnItems).add(
    newItem.discountTotal,
  ).value

  // This is the total price after applying discount on items.
  summary.total = currency(summary.total).add(newItem.totalPrice).value

  const totalAfterDiscountOnTotal = currency(summary.total).subtract(
    summary.discountOnTotal,
  )

  summary.taxAmount = totalAfterDiscountOnTotal.multiply(
    summary.tax * 0.01,
  ).value

  summary.netTotal = totalAfterDiscountOnTotal.subtract(summary.taxAmount).value

  return state
}

const removeItemFromCartReducer = (
  oldState: CartState,
  action: PayloadAction<CartItemState>,
): void => {
  const item = action.payload
  const state = cloneObj(oldState)
  delete state.items[item.id]

  const isCartEmpty = Object.keys(state.items).length === 0
  if (isCartEmpty) {
    return
  }

  const { summary } = state

  summary.noOfItems--
  summary.noOfInividualItems -= item.qty
  summary.discountOnItems = currency(summary.discountOnItems).subtract(
    item.discountTotal,
  ).value
  summary.total = currency(summary.total).subtract(item.totalPrice).value

  const totalAfterDiscountOnTotal = currency(summary.total).subtract(
    summary.discountOnTotal,
  )

  summary.taxAmount = totalAfterDiscountOnTotal.multiply(
    summary.tax * 0.01,
  ).value

  summary.netTotal = totalAfterDiscountOnTotal.subtract(summary.taxAmount).value
}

const updateDiscountOnItemsReducer = (
  oldState: CartState,
  action: PayloadAction<number>,
) => {
  const discount = action.payload
  const state = cloneObj(oldState)

  const { items } = state
  const keys = Object.keys(items)

  for (let idx = 0; idx < keys.length; idx++) {
    const tmp = items[keys[idx]]

    tmp.discount = currency(discount).value
    tmp.discountTotal = currency(discount).multiply(tmp.qty).value

    tmp.sellingPrice = currency(tmp.price).subtract(tmp.discount).value

    tmp.totalPrice = currency(tmp.sellingPrice).multiply(tmp.qty).value
  }

  const { summary } = state
  const oldDiscountOnItems = summary.discountOnItems

  summary.discountOnItems = currency(discount).multiply(
    summary.noOfInividualItems,
  ).value

  summary.total = currency(summary.total)
    .add(oldDiscountOnItems)
    .subtract(summary.discountOnItems).value

  const totalAfterDiscountOnTotal = currency(summary.total).subtract(
    summary.discountOnTotal,
  )

  summary.taxAmount = totalAfterDiscountOnTotal.multiply(
    summary.tax * 0.01,
  ).value

  summary.netTotal = totalAfterDiscountOnTotal.subtract(summary.taxAmount).value

  return state
}

const updateDiscountOnTotalReducer = (
  oldState: CartState,
  action: PayloadAction<number>,
) => {
  const discount = action.payload
  const state = cloneObj(oldState)

  const { summary } = state

  summary.discountOnTotal = currency(discount).value

  const totalAfterDiscountOnTotal = currency(summary.total).subtract(
    summary.discountOnTotal,
  )

  summary.taxAmount = totalAfterDiscountOnTotal.multiply(
    summary.tax * 0.01,
  ).value

  summary.netTotal = totalAfterDiscountOnTotal.subtract(summary.taxAmount).value

  return state
}

const updateTaxReducer = (
  oldState: CartState,
  action: PayloadAction<number>,
) => {
  const tax = action.payload
  const state = cloneObj(oldState)

  const { summary } = state

  const totalAfterDiscountOnTotal = currency(summary.total).subtract(
    summary.discountOnTotal,
  )

  summary.tax = tax

  summary.taxAmount = totalAfterDiscountOnTotal.multiply(
    summary.tax * 0.01,
  ).value

  summary.netTotal = totalAfterDiscountOnTotal.subtract(summary.taxAmount).value

  return state
}

const emptyCartReducer = (oldState: CartState) => {
  oldState.items = Object.assign({}, initialState.items)
  oldState.summary = Object.assign({}, initialState.summary)
}

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartItem: updateCartItemReducer,
    addItemToCart: addItemToCartReducer,
    removeItemFromCart: removeItemFromCartReducer,
    updateDiscountOnItems: updateDiscountOnItemsReducer,
    updateDiscountOnTotal: updateDiscountOnTotalReducer,
    updateTax: updateTaxReducer,
    emptyCart: emptyCartReducer,
  },
})

export const {
  updateCartItem,
  addItemToCart,
  removeItemFromCart,
  updateDiscountOnItems,
  updateDiscountOnTotal,
  updateTax,
  emptyCart,
} = slice.actions

export const selectCartState = (state: RootState) => state.cart

export default slice.reducer
