import Container from "@/components/layout/Container/Container"
import { useGetProfitLossReportQuery } from "@/services/api"
import { formatDateTimeToLocale } from "@/utils/string"
import { GetApp } from "@mui/icons-material"
import { Button, CircularProgress, Grid, useTheme } from "@mui/material"
import { t } from "i18next"
import { DateTime } from "luxon"

import { SaleReportPDF } from "./SaleReportPDF/SaleReportPDF"
import { generateSaleReportPDF } from "./SaleReportPDF/util"

const today = formatDateTimeToLocale(DateTime.now(), {
  weekday: "long",
  month: "long",
  hour: undefined,
  minute: undefined,
  second: undefined,
})
const title = `${t("Profit Loss Report")} - ${today}`
const saleSummaryTableId = "profit-loss-summary-table"
const saleProductTableId = "profit-loss-product-table"
const fileName = `POS - ${t("Profit Loss Report")} - ${DateTime.now().toFormat(
  "dd-MM-yyyy",
)}.pdf`

const ProfitLossReport = () => {
  const theme = useTheme()

  const { data, isLoading } = useGetProfitLossReportQuery(null, {
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
    <Container title={t("Profit Loss Report")}>
      <Grid container spacing={3}>
        <Grid item>
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

export default ProfitLossReport
