import Container from "@/components/layout/Container/Container"
import { useGetYearlySalesQuery } from "@/services/api"
import { formatDateTimeToLocale } from "@/utils/string"
import { Button, CircularProgress, Grid, useTheme } from "@material-ui/core"
import { GetApp } from "@material-ui/icons"
import { t } from "i18next"
import { DateTime } from "luxon"

import { SaleReportPDF } from "./SaleReportPDF"
import { generateSaleReportPDF } from "./util"

const today = formatDateTimeToLocale(DateTime.now(), {
  day: undefined,
  weekday: undefined,
  month: undefined,
  hour: undefined,
  minute: undefined,
  second: undefined,
})
const title = `${t("Yearly Sales Report")} - ${today}`
const saleSummaryTableId = "yearly-sale-summary-table"
const saleProductTableId = "yearly-sale-product-table"
const fileName = `POS - ${t("Yearly Sales Report")} - ${DateTime.now().toFormat(
  "yyyy",
)}.pdf`

const YearlySaleReport = () => {
  const theme = useTheme()

  const { data, isLoading } = useGetYearlySalesQuery(null, {
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
    <Container title={t("Yearly Sales Report")}>
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

export default YearlySaleReport
