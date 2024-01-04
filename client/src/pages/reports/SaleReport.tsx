import Container from "@/components/layout/Container/Container"
import { useGetDailySalesQuery } from "@/services/api"
import { formatDateTimeToLocale } from "@/utils/string"
import { Button, CircularProgress, Grid, useTheme } from "@mui/material"
import { GetApp } from "@mui/icons-material"
import { t } from "i18next"
import { DateTime } from "luxon"

import { SaleReportPDF } from "./SaleReportPDF"
import { generateSaleReportPDF } from "./util"

const today = formatDateTimeToLocale(DateTime.now(), {
  weekday: "long",
  month: "long",
  hour: undefined,
  minute: undefined,
  second: undefined,
})
const title = `${t("Daily Sales Report")} - ${today}`
const saleSummaryTableId = "daily-sale-summary-table"
const saleProductTableId = "daily-sale-product-table"
const fileName = `POS - ${t("Daily Sales Report")} - ${DateTime.now().toFormat(
  "dd-MM-yyyy",
)}.pdf`

const DailySaleReport = () => {
  const theme = useTheme()

  const { data, isLoading } = useGetDailySalesQuery(null, {
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
        <Grid item>
          <Button
            size="small"
            onClick={onClickDownload}
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <CircularProgress
                  size={theme.typography.body1.fontSize}
                  color="inherit"
                />
              ) : (
                <GetApp color="inherit" />
              )
            }
            variant="contained"
            color="primary"
          >
            Download
          </Button>
        </Grid>

        <Grid item>
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
