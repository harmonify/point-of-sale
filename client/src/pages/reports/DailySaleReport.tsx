import Container from "@/components/layout/Container/Container"
import { useGetDailySalesReportQuery } from "@/services/api"
import { formatDateTimeToLocale } from "@/utils/string"
import { Button, CircularProgress, Grid, useTheme } from "@mui/material"
import { t } from "i18next"
import { DateTime } from "luxon"
import { useState } from "react"

import { SaleReportPDF } from "./SaleReportPDF/SaleReportPDF"
import { generateSaleReportPDF } from "./SaleReportPDF/util"
import { GetApp, Print } from "@mui/icons-material"

const now = DateTime.now()
const today = formatDateTimeToLocale(now, {
  weekday: "long",
  month: "long",
  hour: undefined,
  minute: undefined,
  second: undefined,
})
const title = `${t("Daily Sales Report")} - ${today}`
const saleSummaryTableId = "daily-sale-summary-table"
const saleProductTableId = "daily-sale-product-table"
const fileName = `POS - ${t("Daily Sales Report")} - ${now.toFormat(
  "dd-MM-yyyy",
)}.pdf`

const DailySaleReport = () => {
  const theme = useTheme()

  const { data, isLoading } = useGetDailySalesReportQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const onClickDownload = () => {
    generateSaleReportPDF({
      title,
      saleSummaryTableId,
      saleProductTableId,
      fileName,
    })
  }

  return (
    <Container title={t("Daily Sales Report")}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            size="medium"
            onClick={onClickDownload}
            disabled={isLoading}
            startIcon={
              isLoading ? (
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
          <SaleReportPDF
            saleSummaryTableId={saleSummaryTableId}
            saleProductTableId={saleProductTableId}
            title={today}
            data={data?.data}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DailySaleReport
