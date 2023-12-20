import React, { Component } from "react"
import currency from "currency.js"
import { connect } from "react-redux"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import Table from "@material-ui/core/Table"
import YesNo from "../../../../features/dialog/YesNo"
import EditCartItem from "../editCartItem/EditCartItem"
import CartHeader from "./cartHeader"
import CartBody from "./cartBody"
import CartFooter from "./cartFooter"
import {
  emptyCart,
  removeItemFromCart,
  selectCartState,
  updateCartItem,
} from "@/features/cart"
import { createSelector } from "@reduxjs/toolkit"
import { useAppSelector } from "@/app/hooks"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
}))

const CartTable: React.FC = () => {
  const classes = useStyles()
  const cartObj = useAppSelector(selectCartState)
  const cartArray = Object.values(cartObj)

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
    <Paper className={classes.root}>
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
