import { useAppDispatch } from "@/app/hooks"
import { showSnackbar } from "@/features/snackbar"
import { Box, Button, CircularProgress, Grid } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { t } from "i18next"
import React, { useRef, useState } from "react"

import { generateInvoicePDF } from "./util"
import { Print } from "@mui/icons-material"
import InvoicePDF from "./OrderReceiptPDF"
import { useTheme } from "@mui/styles"

export interface InvoicePDFContainerProps {
  data: Monorepo.Api.Response.SaleResponseDto
  isLoading?: boolean
}

const InvoicePDFContainer: React.FC<InvoicePDFContainerProps> = (props) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const pdfRef = useRef<HTMLElement>(null)

  const handleDownloadPDF = () => {
    if (pdfRef.current) {
      return generateInvoicePDF({
        el: pdfRef.current,
        title: `POS - Invoice - ${props.data.invoiceNumber}`,
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
      <Grid item xs={12} md={8}>
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
        >
          {t("Print", { ns: "action" })}
        </Button>
      </Grid>

      <Grid item xs={12}>
        <InvoicePDF data={props.data} ref={pdfRef} />
      </Grid>
    </Grid>
  )
}

export default InvoicePDFContainer
