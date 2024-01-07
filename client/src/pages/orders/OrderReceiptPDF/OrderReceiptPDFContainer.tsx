import { useAppDispatch } from "@/app/hooks"
import { showSnackbar } from "@/features/snackbar"
import { Print } from "@mui/icons-material"
import { Button, CircularProgress, Grid } from "@mui/material"
import { useTheme } from "@mui/styles"
import { t } from "i18next"
import React, { useRef } from "react"
import useMeasure from "react-use-measure"

import OrderPDF from "./OrderReceiptPDF"
import { generateOrderPDF } from "./util"

export interface OrderPDFContainerProps {
  data: Monorepo.Api.Response.SaleResponseDto
  isLoading?: boolean
}

const OrderPDFContainer: React.FC<OrderPDFContainerProps> = (props) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const pdfRef = useRef<HTMLElement>(null)

  const [pdfContainerRef, bounds] = useMeasure()

  const handleDownloadPDF = () => {
    if (pdfRef.current) {
      return generateOrderPDF({
        el: pdfRef.current,
        title: `POS - Order - ${props.data.invoiceNumber}`,
        width: bounds.width,
        height: bounds.height,
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

      <Grid item xs={12} ref={pdfContainerRef}>
        <OrderPDF ref={pdfRef} data={props.data} />
      </Grid>
    </Grid>
  )
}

export default OrderPDFContainer
