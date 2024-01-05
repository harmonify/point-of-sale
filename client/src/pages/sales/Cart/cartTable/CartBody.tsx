import { useAppDispatch } from "@/app/hooks"
import FormikNumberInput from "@/components/forms/FormikNumberInput"
import { APP_DEFAULT_CURRENCY, APP_DEFAULT_LANG } from "@/environment"
import {
  CartItemStateSummary,
  CartStateSummary,
  removeCartItem,
  updateCartItemDiscount,
  updateCartItemQuantity,
} from "@/features/cart"
import { formatRupiah } from "@/utils"
import { Delete } from "@mui/icons-material"
import {
  Grid,
  IconButton,
  TableBody,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material"
import { t } from "i18next"
import React, { useMemo } from "react"

import CustomTableCell from "./controls/CustomTableCell"
import { isNumber } from "@/utils/number"

const CartBody: React.FC<{ cartState: CartStateSummary }> = ({ cartState }) => {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const cartItems = useMemo(
    () => Object.values(cartState.items) as CartItemStateSummary[],
    [cartState],
  )

  if (cartItems.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <CustomTableCell
            colSpan={9999}
            style={{ padding: 20, textAlign: "center" }}
          >
            <Typography component="strong">
              {t("No items in the cart", { ns: "message" })}
            </Typography>
          </CustomTableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <TableBody>
      {cartItems.map((row, index) => (
        <TableRow key={index}>
          {/* Num */}
          <CustomTableCell align="center" padding="none" variant="body">
            <Typography>{index + 1}</Typography>
          </CustomTableCell>

          {/* Product details */}
          <CustomTableCell
            colSpan={2}
            padding="none"
            variant="body"
            style={{ overflowWrap: "anywhere" }}
          >
            <Grid container>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {row.name}
                </Typography>
                <Typography>
                  {t("Unit")}
                  {": "}
                  {row.unitName}
                </Typography>
                <Typography>
                  {t("Price")}
                  {": "}
                  {formatRupiah(row.salePrice)}
                </Typography>
              </Grid>
            </Grid>
          </CustomTableCell>

          {/* Quantity */}
          <CustomTableCell align="center" variant="body">
            <FormikNumberInput
              name={`items[${row.productUnitId}].quantity`}
              margin="none"
              size="small"
              onChange={(e) => {
                const value = parseFloat(e.target.value)
                dispatch(
                  updateCartItemQuantity({
                    productUnitId: row.productUnitId,
                    quantity: isNumber(value) ? value : 0,
                  }),
                )
              }}
              InputLabelProps={{ shrink: true }}
            />
          </CustomTableCell>

          {/* Discount */}
          <CustomTableCell variant="body">
            <FormikNumberInput
              intlConfig={{
                locale: APP_DEFAULT_LANG,
                currency: APP_DEFAULT_CURRENCY,
              }}
              name={`items[${row.productUnitId}].discount`}
              margin="none"
              size="small"
              onChange={(e) => {
                const value = parseFloat(e.target.value)
                dispatch(
                  updateCartItemDiscount({
                    productUnitId: row.productUnitId,
                    discountType: "FLAT",
                    inputDiscount: isNumber(value) ? value : 0,
                  }),
                )
              }}
              InputLabelProps={{ shrink: true }}
            />
          </CustomTableCell>

          {/* Total */}
          <CustomTableCell variant="body" style={{ overflowWrap: "anywhere" }}>
            <Typography variant="h6">{formatRupiah(row.total)}</Typography>
          </CustomTableCell>

          {/* Actions */}
          <CustomTableCell align="center" variant="body" padding="none">
            <IconButton
              onClick={() => dispatch(removeCartItem(row.productUnitId))}
              size="small"
              color="error"
            >
              <Delete />
            </IconButton>
          </CustomTableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default CartBody
