import { useAppSelector } from "@/app/hooks"
import {
  emptyCart,
  removeCartItem,
  selectCart,
  upsertCartItem,
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
import { logger } from "@/services/logger"

const initialCartItem = {
  id: "",
  name: "",
  quantity: 0,
  price: 0.0,
  discount: 0.0,
}
const initialCartItem2 = {
  id: "",
  name: "",
  quantity: 0,
  price: 0.0,
  discount: 0.0,
}

const CartTable: React.FC = () => {
  const cartObj = useAppSelector(selectCart)
  const cartArray = Object.values(cartObj.items)
  logger.debug(`🚀 ~ cartObj ~ ${JSON.stringify(cartObj, null, 2)}`)
  logger.debug(`🚀 ~ cartArray ~ ${JSON.stringify(cartArray, null, 2)}`)

  const state = {
    showConfirmDeleteDialog: false,
    showEditDialog: false,
    itemToEdit: initialCartItem2,
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

    const price = currency(clone.price).subtract(discount)
    const totalPrice = currency(price).multiply(quantity)

    clone.quantity = Number(quantity)
    clone.discount = discount

    clone.price = price.toString()
    clone.totalPrice = totalPrice.toString()

    setState({ itemToEdit: clone })
  }

  const onDeleteAllClick = () => {
    setState({ showConfirmDeleteDialog: true })
  }

  const onDeleteCartItemClick = (row) => {
    removeCartItem(row)
  }

  // Edit cart item dialog
  const onProductItemClick = (itemToEdit) => {
    setState({ itemToEdit, showEditDialog: true })
  }

  const onCancelEditItemClick = () => {
    setState({ showEditDialog: false, itemToEdit: initialCartItem2 })
  }

  const onSaveItemClick = () => {
    const { itemToEdit } = state

    const clone = {}

    Object.assign(clone, itemToEdit)

    upsertCartItem(itemToEdit)
    setState({ showEditDialog: false, itemToEdit: initialCartItem2 })
  }

  return (
    <Paper>
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
      {/* <CartFooter summary={cartObj.summary} cartArray={cartArray} /> */}
    </Paper>
  )
}

export default CartTable
