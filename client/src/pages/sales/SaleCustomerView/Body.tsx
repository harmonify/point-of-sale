import { CartItemStateSummary, CartStateSummary } from "@/features/cart"
import { formatRupiah } from "@/utils"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { makeStyles, useTheme } from "@mui/styles"
import { t } from "i18next"

import { viewTheme } from "./SaleCustomerView"
import { mockCartState } from "@/features/cart/mock"
import { getCartStateWithSummary } from "@/features/cart/util"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: viewTheme.backgroundColor,
    color: viewTheme.color,
    width: "100%",
    // minHeight: "calc(100vh - 1px)", // TODO: a hack
    flex: "1",
    overflow: "auto",
    borderBottom: "1px solid #e0e0e0",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    "& .MuiTable-root": {
      border: `1px solid ${theme.palette.grey[500]}`,
    },
    "& .MuiTableCell-root": {
      border: `1px solid ${theme.palette.grey[500]}`,
      padding: theme.spacing(1),
    },
  },
}))

const shouldUseMock = false

export const Body: React.FC<{
  cartState?: CartStateSummary
}> = ({ cartState: cartStateProp }) => {
  const classes = useStyles()
  const theme = useTheme()

  const cartState = shouldUseMock
    ? getCartStateWithSummary(mockCartState)
    : cartStateProp

  return (
    <Box className={classes.root}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
            <TableCell align="center">
              <Typography variant="h6" color={viewTheme.color}>
                {t("Product")}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" color={viewTheme.color}>
                {t("Qty")}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" color={viewTheme.color}>
                {t("Price")}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" color={viewTheme.color}>
                {t("Subtotal")}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cartState ? (
            Object.values(cartState.items || {}).map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: "45%" }}>
                  <Typography
                    color={viewTheme.color}
                    fontSize={theme.typography.body1.fontSize}
                  >
                    {item.name}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ width: "15%" }}>
                  <Typography color={viewTheme.color}>
                    {item.quantity} {item.unitName}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ width: "20%" }}>
                  <Typography
                    color={viewTheme.color}
                    component={item.discount > 0 ? "s" : "span"}
                  >
                    {formatRupiah(item.salePrice)}
                  </Typography>
                  {item.discount > 0 ? (
                    <Typography
                      color={viewTheme.color}
                      display={"inline-block"}
                      marginLeft={1}
                    >
                      {formatRupiah(item.salePrice - item.discount)}
                    </Typography>
                  ) : null}
                </TableCell>
                <TableCell align="right" sx={{ width: "20%" }}>
                  <Typography color={viewTheme.color}>
                    {formatRupiah(item.total)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9999}
                style={{ padding: 20, textAlign: "center" }}
              >
                <Typography component="strong" color={viewTheme.color}>
                  {t("No items in the cart", { ns: "message" })}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
            <TableCell colSpan={9999} style={{ textAlign: "right" }}>
              <Typography variant="h6" color={viewTheme.color}>
                {formatRupiah(cartState?.subTotal)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  )
}
