import { useAppDispatch } from "@/app/hooks"
import FormikNumberInput from "@/components/forms/FormikNumberInput"
import { APP_DEFAULT_CURRENCY, APP_DEFAULT_LANG } from "@/environment"
import {
  CartStateSummary,
  updateCartDiscountTotal,
  updateCartPaidAmount,
} from "@/features/cart"
import { formatRupiah, truncate } from "@/utils/string"
import {
  Box,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material"
import { t } from "i18next"
import React, { Component } from "react"

import CustomerCell from "./CustomerCell"

const CartFooter: React.FC<{
  cartState: CartStateSummary
}> = ({ cartState }) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" style={{ marginRight: theme.spacing(1) }}>
              {t("Customer")}:
            </Typography>
            <CustomerCell />
          </Box>
        </TableCell>
        <TableCell align="right">
          <Typography variant="h6">{t("Subtotal")}: </Typography>
        </TableCell>
        <TableCell colSpan={2}>
          <Typography variant="h6">
            {formatRupiah(cartState.subTotal)}
          </Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={5} align="right">
          <Typography variant="h6">
            {t("Discount Total")}
            {": "}
            {""}
          </Typography>
        </TableCell>
        <TableCell style={{ padding: theme.spacing(1) }} colSpan={2}>
          <FormikNumberInput
            intlConfig={{
              locale: APP_DEFAULT_LANG,
              currency: APP_DEFAULT_CURRENCY,
            }}
            name="inputDiscountTotal"
            margin="none"
            size="small"
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              dispatch(
                updateCartDiscountTotal({
                  discountTotalType: "FLAT",
                  inputDiscountTotal:
                    value && typeof value === "number" ? value : 0,
                }),
              )
            }}
            InputLabelProps={{ shrink: true }}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={5} align="right">
          <Typography variant="h6">{t("Total")}: </Typography>
        </TableCell>
        <TableCell colSpan={2}>
          <Typography variant="h6">{formatRupiah(cartState.total)}</Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={5} align="right">
          <Typography variant="h6">{t("Paid")}: </Typography>
        </TableCell>
        <TableCell colSpan={2} style={{ padding: theme.spacing(1) }}>
          <FormikNumberInput
            intlConfig={{
              locale: APP_DEFAULT_LANG,
              currency: APP_DEFAULT_CURRENCY,
            }}
            name="paid"
            margin="none"
            size="small"
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              dispatch(
                updateCartPaidAmount(
                  value && typeof value === "number" ? value : 0,
                ),
              )
            }}
            InputLabelProps={{ shrink: true }}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={5} align="right">
          <Typography variant="h6">{t("Change")}: </Typography>
        </TableCell>
        <TableCell colSpan={2}>
          <Typography
            variant="h6"
            style={{
              color:
                cartState.change === 0
                  ? theme.palette.info.main
                  : cartState.change > 0
                  ? theme.palette.success.main
                  : theme.palette.error.main,
            }}
          >
            {formatRupiah(cartState.change)}
          </Typography>
        </TableCell>
      </TableRow>

      {/* <TotalRow totalPrice={cartState.total} /> */}
      {/* <TaxDiscountRow cartArray={props.cartArray} summary={props.summary} /> */}
      {/* <TotalBillRow netTotal={netTotal} /> */}
    </TableFooter>
  )
}

export default CartFooter
