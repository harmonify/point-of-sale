import { useAppSelector } from "@/app/hooks"
import {
  emptyCart,
  removeItemFromCart,
  selectCartState,
  updateCartItem,
} from "@/features/cart"
import { Paper } from "@material-ui/core"
import Table from "@material-ui/core/Table"
import currency from "currency.js"
import React, { Component } from "react"

import YesNo from "../../../../features/dialog/YesNo"
import EditCartItem from "../editCartItem/EditCartItem"
import CartBody from "./cartBody/CartBody"
import CartFooter from "./cartFooter/CartFooter"
import CartHeader from "./CartHeader"

const CartTable: React.FC = () => {
  const cartObj = useAppSelector(selectCartState)
  const cartArray = Object.values(cartObj.items)
  console.log(`🚀 ~ cartObj ~ ${JSON.stringify(cartObj, null, 2)}`);
  console.log(`🚀 ~ cartArray ~ ${JSON.stringify(cartArray, null, 2)}`);

  const initialCartItem = {
    id: "",
    name: "",
    quantity: 0,
    price: 0.0,
    discount: 0.0,
  }

  const state = {
    showConfirmDeleteDialog: false,
    showEditDialog: false,
    itemToEdit: initialCartItem,
  }

  const { showConfirmDeleteDialog, showEditDialog, itemToEdit } = state

  // onChange event for edit cart item form.
  const onChange = (e) => {
    const { itemToEdit } = state
    const clone = {} as typeof itemToEdit
    Object.assign(clone, itemToEdit)

    let { quantity, discount } = clone

    if (e.target.name === "discount") {
      discount = e.target.value
    } else {
      quantity = e.target.value
    }

    const sellingPrice = currency(clone.price).subtract(discount)
    const totalPrice = currency(sellingPrice).multiply(quantity)

    clone.quantity = Number(quantity)
    clone.discount = discount

    clone.sellingPrice = sellingPrice.toString()
    clone.totalPrice = totalPrice.toString()

    setState({ itemToEdit: clone })
  }

  // Empty cart dialog
  const onConfirmDeleteClick = () => {
    emptyCart()
    setState({ showConfirmDeleteDialog: false })
  }

  const onDeleteAllClick = () => {
    setState({ showConfirmDeleteDialog: true })
  }

  const onDeleteCartItemClick = (row) => {
    removeItemFromCart(row)
  }

  const onCancelConfirmDeleteClick = () => {
    setState({ showConfirmDeleteDialog: false })
  }

  // Edit cart item dialog
  const onProductItemClick = (itemToEdit) => {
    setState({ itemToEdit, showEditDialog: true })
  }

  const onCancelEditItemClick = () => {
    setState({ showEditDialog: false, itemToEdit: initialCartItem })
  }

  const onSaveItemClick = () => {
    const { itemToEdit } = state

    const clone = {}

    Object.assign(clone, itemToEdit)

    updateCartItem(itemToEdit)
    setState({ showEditDialog: false, itemToEdit: initialCartItem })
  }

  return (
    <Paper>
      <YesNo
        open={showConfirmDeleteDialog}
        message="Are you sure wan't to empty the cart?"
        onOk={onConfirmDeleteClick}
        onCancel={onCancelConfirmDeleteClick}
      />

      <EditCartItem
        cartObj={cartObj}
        open={showEditDialog}
        item={itemToEdit}
        onSave={onSaveItemClick}
        onCancel={onCancelEditItemClick}
        onChange={onChange}
      />

      <Table>
        <CartHeader onDeleteAll={onDeleteAllClick} />
        <CartBody
          cartArray={cartArray}
          onDeleteCartItem={onDeleteCartItemClick}
          onProductItemSelect={onProductItemClick}
        />
      </Table>
      <CartFooter summary={cartObj.summary} cartArray={cartArray} />
    </Paper>
  )
}

export default CartTable
