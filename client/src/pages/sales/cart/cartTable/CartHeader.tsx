import React from "react"
import { TableRow, TableHead } from "@material-ui/core"
import CustomTableCell from "./controls/CustomTableCell"
import DeleteButton from "./controls/DeleteButton"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { emptyCart, selectCartState } from "@/features/cart"
import { t } from "i18next"

const CartHeader: React.FC = () => {
  const dispatch = useAppDispatch()
  const cartState = useAppSelector(selectCartState)
  const cartArr = Object.values(cartState.items)

  const isCartEmpty = cartArr.length === 0

  const onDeleteAll = () => {
    dispatch(emptyCart())
    setState({ showConfirmDeleteDialog: true })
  }

  return (
    <TableHead>
      <TableRow>
        <CustomTableCell style={{ textAlign: "center" }}>
          {t("Num")}
        </CustomTableCell>
        <CustomTableCell style={{ width: 150, textAlign: "center" }}>
          {t("Product Name")}
        </CustomTableCell>
        <CustomTableCell numeric>{t("Price")}</CustomTableCell>
        <CustomTableCell numeric>{t("Quantity")}</CustomTableCell>
        <CustomTableCell numeric>{t("Total")}</CustomTableCell>
        <CustomTableCell numeric style={{ width: 30, paddingRight: "5px" }}>
          {!isCartEmpty && <DeleteButton onDelete={onDeleteAll} />}
        </CustomTableCell>
      </TableRow>
    </TableHead>
  )
}

export default CartHeader
