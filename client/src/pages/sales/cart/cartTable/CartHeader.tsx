import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { emptyCart, selectCart } from "@/features/cart"
import { Padding, TableHead, TableRow } from "@material-ui/core"
import { t } from "i18next"
import React from "react"

import CustomTableCell from "./controls/CustomTableCell"

const CartHeader: React.FC = () => {
  const headers: {
    label: string
    colSpan: number
    padding: Padding
    widthPercentage: number
  }[] = [
    { label: t("Num"), colSpan: 1, padding: "none", widthPercentage: 5 },
    { label: t("Product"), colSpan: 2, padding: "normal", widthPercentage: 35 },
    { label: t("Qty"), colSpan: 1, padding: "normal", widthPercentage: 15 },
    {
      label: t("Discount"),
      colSpan: 1,
      padding: "normal",
      widthPercentage: 25,
    },
    { label: t("Total"), colSpan: 1, padding: "normal", widthPercentage: 35 },
    { label: t("Actions"), colSpan: 1, padding: "normal", widthPercentage: 5 },
  ]
  const totalWidthPercentage = headers.reduce(
    (acc, h) => acc + h.widthPercentage,
    0,
  )

  return (
    <TableHead>
      <TableRow>
        {headers.map((h, index) => (
          <CustomTableCell
            key={index}
            align="center"
            variant="head"
            colSpan={h.colSpan}
            padding={h.padding}
            style={{
              width: `${(100 / totalWidthPercentage) * h.widthPercentage}%`,
            }}
          >
            {h.label}
          </CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default CartHeader
