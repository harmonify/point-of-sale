import { useAppDispatch } from "@/app/hooks"
import { showSnackbar } from "@/features/snackbar"
import { Print } from "@mui/icons-material"
import { Box, Button, CircularProgress, Grid } from "@mui/material"
import { useTheme } from "@mui/styles"
import { t } from "i18next"
import React, { useRef } from "react"

import { generateOrderInvoicePDF } from "./util"
import OrderInvoicePDF from "./OrderInvoicePDF"

export interface OrderInvoicePDFContainerProps {
  data: Monorepo.Api.Response.SaleResponseDto
  isLoading?: boolean
}

const OrderInvoicePDFContainer: React.FC<OrderInvoicePDFContainerProps> = (
  props,
) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const pdfRef = useRef<HTMLElement>(null)

  const handleDownloadPDF = () => {
    if (pdfRef.current) {
      return generateOrderInvoicePDF({
        el: pdfRef.current,
        title: `POS - Order Invoice - ${props.data.invoiceNumber}`,
      })
    } else {
      return dispatch(
        showSnackbar({
          message: t("default", { ns: "error" }),
          variant: "error",
        }),
      )
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          onClick={handleDownloadPDF}
          disabled={props.isLoading}
          size="large"
          startIcon={
            props.isLoading ? (
              <CircularProgress
                size={theme.typography.body1.fontSize}
                color="inherit"
              />
            ) : (
              <Print color="inherit" />
            )
          }
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("Print", { ns: "action" })}
        </Button>
      </Grid>

      <Grid item xs={12}>
        <OrderInvoicePDF ref={pdfRef} data={props.data} />
      </Grid>
    </Grid>
  )
}

export default OrderInvoicePDFContainer
