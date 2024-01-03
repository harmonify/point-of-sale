import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { emptyCart, selectCart } from "@/features/cart"
import { TableHead, TableRow } from "@material-ui/core"
import { t } from "i18next"
import React from "react"

import CustomTableCell from "./controls/CustomTableCell"

const CartHeader: React.FC = () => {
  const headers: { label: string; colSpan: number }[] = [
    { label: t("Num"), colSpan: 1 },
    { label: t("Product"), colSpan: 2 },
    { label: t("Qty"), colSpan: 1 },
    { label: t("Discount"), colSpan: 1 },
    { label: t("Total"), colSpan: 1 },
    { label: t("Actions"), colSpan: 1 },
  ]

  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <CustomTableCell
            align="center"
            variant="head"
            colSpan={header.colSpan}
          >
            {header.label}
          </CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default CartHeader
