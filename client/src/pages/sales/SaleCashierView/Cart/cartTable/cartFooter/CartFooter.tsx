import { useAppDispatch } from "@/app/hooks"
import FormikNumberInput from "@/components/forms/FormikNumberInput"
import { APP } from "@/constants"
import {
  CartStateSummary,
  updateCartDescription,
  updateCartDiscountTotal,
  updateCartName,
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

// import CustomerCell from "./CustomerCell"
import FormikTextInput from "@/components/forms/FormikTextInput"
import { isNumber } from "@/utils/number"

const CartFooter: React.FC<{
  cartState: CartStateSummary
}> = ({ cartState }) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={4} rowSpan={5}>
          <FormikTextInput
            name="description"
            margin="none"
            label={t("Description")}
            InputLabelProps={{ shrink: true }}
            helperText={t("More details about this order.", { ns: "message" })}
            size="small"
            multiline
            minRows={8}
            maxRows={8}
            onChange={(e) => {
              dispatch(updateCartDescription(e.target.value))
            }}
          />
        </TableCell>
        <TableCell align="right" colSpan={1}>
          <Typography variant="h6">{t("Subtotal")}: </Typography>
        </TableCell>

        <TableCell colSpan={2}>
          <Typography variant="h6">
            {formatRupiah(cartState.subTotal)}
          </Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        {/* <TableCell colSpan={4}>
          <FormikTextInput
            name="name"
            margin="none"
            label={t("Order Name")}
            InputLabelProps={{ shrink: true }}
            helperText={t(
              "Providing a name might help you to identify the order more quickly.",
              { ns: "message" },
            )}
            onChange={(e) => {
              dispatch(updateCartName(e.target.value))
            }}
            size="small"
            style={{ margin: 0 }}
          />
        </TableCell> */}

        <TableCell align="right" colSpan={1}>
          <Typography variant="h6">
            {t("Discount on Total")}
            {": "}
            {""}
          </Typography>
        </TableCell>

        <TableCell style={{ padding: theme.spacing(1) }} colSpan={2}>
          <FormikNumberInput
            intlConfig={{
              locale: APP.defaultLang,
              currency: APP.defaultCurrency,
            }}
            name="inputDiscountTotal"
            margin="none"
            size="small"
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              dispatch(
                updateCartDiscountTotal({
                  discountTotalType: "FLAT",
                  inputDiscountTotal: isNumber(value) ? value : 0,
                }),
              )
            }}
            InputLabelProps={{ shrink: true }}
          />
        </TableCell>
      </TableRow>

      <TableRow>

        <TableCell align="right">
          <Typography variant="h6">{t("Total")}: </Typography>
        </TableCell>

        <TableCell colSpan={2}>
          <Typography variant="h6">{formatRupiah(cartState.total)}</Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell align="right">
          <Typography variant="h6">{t("Cash")}: </Typography>
        </TableCell>

        <TableCell colSpan={2} style={{ padding: theme.spacing(1) }}>
          <FormikNumberInput
            intlConfig={{
              locale: APP.defaultLang,
              currency: APP.defaultCurrency,
            }}
            name="paid"
            margin="none"
            size="small"
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              dispatch(updateCartPaidAmount(isNumber(value) ? value : 0))
            }}
            InputLabelProps={{ shrink: true }}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell align="right">
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
