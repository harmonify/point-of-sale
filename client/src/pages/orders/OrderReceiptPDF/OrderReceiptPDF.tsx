import { formatISOToLocale, formatRupiah } from "@/utils"
import {
  Box,
  Divider,
  Grid,
  Stack,
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
import React, { forwardRef } from "react"

import { receiptDataMock } from "./mock"
import { formatDateTimeToLocale } from "@/utils/string"
import { DateTime } from "luxon"
import { isNumber } from "@/utils/number"
import { APP } from "@/constants"

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(6),
    "& .MuiTableCell-root": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
}))

export interface OrderReceiptPDFProps {
  data: Monorepo.Api.Response.SaleResponseDto
}

const OrderReceiptPDF = forwardRef<HTMLElement, OrderReceiptPDFProps>(
  (props, ref) => {
    const theme = useTheme()
    const classes = useStyles()

    const { data: receiptData } = props

    return (
      <Box
        className={classes.root}
        ref={ref}
        id="receipt-container"
        sx={{
          width: `100%`,
        }}
      >
        <Typography color="black" variant="h1" align="center">
          {APP.name}
        </Typography>
        <Divider sx={{ marginTop: theme.spacing(2) }} />

        <Table sx={{ marginBottom: theme.spacing(2) }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black">
                  {t("Customer")}:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="black" align="right">
                  {receiptData.customer?.name || "-"}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black">
                  {t("Invoice Number")}:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="black" align="right">
                  {receiptData.invoiceNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black">
                  {t("Cashier")}:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="black" align="right">
                  {receiptData.createdBy?.name || "-"}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black">
                  {t("Date")}:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="black" align="right">
                  {formatDateTimeToLocale(
                    typeof receiptData.createdAt === "string"
                      ? DateTime.fromISO(receiptData.createdAt)
                      : DateTime.fromJSDate(receiptData.createdAt),
                    {
                      second: undefined,
                    },
                  )}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black">
                  {t("Product")}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" color="black">
                  {t("Subtotal")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receiptData.saleProducts.map((saleProduct, index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: "65%" }}>
                  <Typography
                    color="black"
                    fontSize={theme.typography.body1.fontSize}
                  >
                    {saleProduct.productName}
                  </Typography>
                  <Typography
                    fontSize={theme.typography.body2.fontSize}
                    color="black"
                  >
                    {saleProduct.quantity} {saleProduct.unitName} x{" "}
                    {formatRupiah(saleProduct.salePrice)}
                  </Typography>
                  {!isNumber(saleProduct.discount) ||
                  saleProduct.discount <= 0 ? null : (
                    <Typography
                      fontSize={theme.typography.body2.fontSize}
                      color="black"
                    >
                      {t("Discount")}: {formatRupiah(saleProduct.discount)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right" sx={{ width: "35%" }}>
                  <Typography color="black">
                    {formatRupiah(saleProduct.total)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black">
                  {t("Total Qty")}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="black">
                  {receiptData.saleProducts.reduce(
                    (acc, sp) => acc + sp.quantity,
                    0,
                  )}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black">
                  {t("Discount on Total")}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="black">
                  {formatRupiah(receiptData.discountTotal)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black">
                  {t("Total")}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="black">
                  {formatRupiah(receiptData.total)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black">
                  {t("Cash")}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="black">
                  {formatRupiah(receiptData.paid)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black">
                  {t("Change")}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="black">
                  {formatRupiah(receiptData.change)}
                </Typography>
              </TableCell>
            </TableRow>
            {!(receiptData.isNoteVisible && receiptData.note) ? null : (
              <TableRow>
                <TableCell colSpan={9999}>
                  <Typography color="black">{receiptData.note}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>

        <Typography color="black" align="center">
          {t("Thank You")}
        </Typography>
      </Box>
    )
  },
)

export default OrderReceiptPDF
