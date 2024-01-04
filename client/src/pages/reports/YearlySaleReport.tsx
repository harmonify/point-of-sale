import Container from "@/components/layout/Container/Container"
import { useGetYearlySalesReportQuery } from "@/services/api"
import { formatDateTimeToLocale } from "@/utils/string"
import { Print } from "@mui/icons-material"
import { Button, CircularProgress, Grid, useTheme } from "@mui/material"
import { t } from "i18next"
import { DateTime } from "luxon"

import { SaleReportPDF } from "./SaleReportPDF/SaleReportPDF"
import { generateSaleReportPDF } from "./SaleReportPDF/util"

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

  const { data, isLoading } = useGetYearlySalesReportQuery(null, {
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

export default YearlySaleReport
