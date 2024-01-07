import { Box, Divider, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { t } from "i18next"
import React, { forwardRef, useRef, useState } from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(6),
  },
}))

export interface OrderReceiptPDFProps {
  data: Monorepo.Api.Response.SaleResponseDto
}

const OrderReceiptPDF = forwardRef<HTMLElement, OrderReceiptPDFProps>((props, ref) => {
  const classes = useStyles()

  const [receiptData, setReceiptData] = useState({
    date: "1/2/24, 8:51 PM",
    product: "Madison Park Marcella Indigo Cotton Printed (x1)",
    piece: "Twin Comforter Sets (x1)",
    subTotal: "USD 74",
    discount: "USD 387",
    total: "USD 461",
    cashPaid: "USD 5",
    change: "USD 456",
    totalWithTax: "USD 1.000",
    totalTax: "USD 1.000",
    grandTotal: "USD 544 1/2/24 , 8:51 PM",
  })

  const {
    date,
    product,
    piece,
    subTotal,
    discount,
    total,
    cashPaid,
    change,
    totalWithTax,
    totalTax,
    grandTotal,
  } = receiptData

  return (
    <Box className={classes.root} ref={ref} id="receipt-container">
      <Typography color="inherit" variant="h1">
        {t("Order Receipt")}
      </Typography>
      <Divider sx={{ marginY: "1rem" }} />
      <Typography color="inherit">Date: {date}</Typography>
      <Divider sx={{ marginY: "1rem" }} />
      <Typography color="inherit">Product: {product}</Typography>
      <Divider sx={{ marginY: "1rem" }} />
      <Typography color="inherit">Piece: {piece}</Typography>
      <Divider sx={{ marginY: "1rem" }} />
      <Typography color="inherit">Sub Total: {subTotal}</Typography>
      <Divider sx={{ marginY: "1rem" }} />
      <Typography color="inherit">Discount: {discount}</Typography>
      <Divider sx={{ marginY: "1rem" }} />
      <Typography color="inherit">Total: {total}</Typography>
      <Divider sx={{ marginY: "1rem" }} />
      <Typography color="inherit">Cash Paid: {cashPaid}</Typography>
      <Divider sx={{ marginY: "1rem" }} />
      <Typography color="inherit">Change: {change}</Typography>
      <Divider sx={{ marginY: "1rem" }} />
      <Typography color="inherit">Total With Tax: {totalWithTax}</Typography>
      <Divider sx={{ marginY: "1rem" }} />
      <Typography color="inherit">Total Tax: {totalTax}</Typography>
      <Typography color="inherit">Grand Total: {grandTotal}</Typography>
    </Box>
  )
})

export default OrderReceiptPDF
