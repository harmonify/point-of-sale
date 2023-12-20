import React from "react"
import { TableRow, TableHead } from "@material-ui/core"
import CustomTableCell from "../controls/CustomTableCell"
import DeleteButton from "../controls/DeleteButton"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { emptyCart, selectCartItemsArray, selectCartState } from "@/features/cart"

const CartHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartArr = useAppSelector(selectCartItemsArray)

  const isCartEmpty = cartArr.length === 0

  const onDeleteAll = () => {
    dispatch(emptyCart())
    setState({ showConfirmDeleteDialog: true })
  }

  return (
    <TableHead>
      <TableRow>
        <CustomTableCell style={{ width: 150, textAlign: "center" }}>
          Product
        </CustomTableCell>
        <CustomTableCell numeric>Price</CustomTableCell>
        <CustomTableCell numeric>quantity</CustomTableCell>
        <CustomTableCell numeric>Total</CustomTableCell>
        <CustomTableCell numeric style={{ width: 30, paddingRight: "5px" }}>
          {!isCartEmpty && <DeleteButton onDelete={onDeleteAll} />}
        </CustomTableCell>
      </TableRow>
    </TableHead>
  )
}

export default CartHeader
