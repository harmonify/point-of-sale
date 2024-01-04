import { useAppSelector } from "@/app/hooks"
import { selectCart } from "@/features/cart"
import { Paper } from "@mui/material"
import Table from "@mui/material/Table"
import React, { Component } from "react"

import CartBody from "./CartBody"
import CartFooter from "./cartFooter/CartFooter"
import CartHeader from "./CartHeader"

const CartTable: React.FC = () => {
  const cart = useAppSelector(selectCart)

  return (
    <Paper>
      <Table>
        <CartHeader />
        <CartBody cartState={cart} />
        <CartFooter cartState={cart} />
      </Table>
    </Paper>
  )
}

export default CartTable
