import Container from "@/components/layout/Container/Container"
import { useGetMonthlySalesReportQuery } from "@/services/api"
import { formatDateTimeToLocale } from "@/utils/string"
import { Print } from "@mui/icons-material"
import { Button, CircularProgress, Grid, useTheme } from "@mui/material"
import { t } from "i18next"
import { DateTime } from "luxon"

import { SaleReportPDF } from "./SaleReportPDF/SaleReportPDF"
import { generateSaleReportPDF } from "./SaleReportPDF/util"

const today = formatDateTimeToLocale(DateTime.now(), {
  month: "long",
  day: undefined,
  weekday: undefined,
  hour: undefined,
  minute: undefined,
  second: undefined,
})
const title = `${t("Monthly Sales Report")} - ${today}`
const saleSummaryTableId = "monthly-sale-summary-table"
const saleProductTableId = "monthly-sale-product-table"
const fileName = `POS - ${t(
  "Monthly Sales Report",
)} - ${DateTime.now().toFormat("MM-yyyy")}.pdf`

const MonthlySaleReport = () => {
  const theme = useTheme()

  const { data, isLoading } = useGetMonthlySalesReportQuery(null, {
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
    <Container title={t("Monthly Sales Report")}>
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

export default MonthlySaleReport
