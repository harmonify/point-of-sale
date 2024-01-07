import Container from "@/components/layout/Container/Container"
import { useLazyGetSalesReportQuery } from "@/services/api"
import { Print, Search } from "@mui/icons-material"
import { Button, CircularProgress, Grid, useTheme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { DatePicker } from "@mui/x-date-pickers"
import { t } from "i18next"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"

import { SaleReportPDF } from "./SaleReportPDF/SaleReportPDF"
import { generateSaleReportPDF } from "./SaleReportPDF/util"
import { DATE_FORMAT } from "@/constants"

const today = DateTime.now().startOf("day")
const todayISO = today.toISODate()
const saleSummaryTableId = "range-date-sale-summary-table"
const saleProductTableId = "range-date-sale-product-table"
const getTitle = (from: string, to: string) => {
  return `${t("Sales Report")} - ${from} - ${to}`
}
const getFileName = (from: string, to: string) => {
  return `POS - ${t("Sales Report")} - ${from} - ${to}.pdf`
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    "& > *": {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  },
}))

const SaleReport = () => {
  const theme = useTheme()

  const classes = useStyles()

  const [dateFrom, setDateFrom] = useState(today)
  const [dateTo, setDateTo] = useState(today)

  const [getSalesReportQuery, { data, isLoading }] = useLazyGetSalesReportQuery(
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  )

  useEffect(() => {
    getSalesReportQuery({ from: todayISO, to: todayISO })
  }, [])

  const onClickSearch = () => {
    return getSalesReportQuery({
      from: dateFrom.toISODate(),
      to: dateTo.toISODate(),
    })
  }

  const onClickDownload = async () => {
    await onClickSearch()
    const fromISO = dateFrom.toISODate()!
    const toISO = dateTo.toISODate()!
    generateSaleReportPDF({
      title: getTitle(fromISO, toISO),
      saleSummaryTableId,
      saleProductTableId,
      fileName: getFileName(fromISO, toISO),
    })
  }

  return (
    <Container title={t("Sales Report")}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          container
          justifyContent={"center"}
          alignItems={"center"}
          className={classes.toolbar}
        >
          <DatePicker
            name="dateFrom"
            value={dateFrom}
            label={t("From")}
            onChange={(newDate) => {
              if (!newDate) return
              setDateFrom(newDate)
            }}
            maxDate={dateTo}
            format={DATE_FORMAT}
          />

          <DatePicker
            name="dateTo"
            value={dateTo}
            label={t("To")}
            sx={{ margin: 0 }}
            onChange={(newDate) => {
              if (!newDate) return
              setDateTo(newDate)
            }}
            disabled={dateFrom.hasSame(today, "day")}
            minDate={dateFrom}
            maxDate={today}
            format={DATE_FORMAT}
          />

          <Button
            onClick={onClickSearch}
            disabled={isLoading}
            size="large"
            startIcon={
              isLoading ? (
                <CircularProgress
                  size={theme.typography.body1.fontSize}
                  color="inherit"
                />
              ) : (
                <Search color="inherit" />
              )
            }
            variant="contained"
            color="primary"
          >
            {t("Search", { ns: "action" })}
          </Button>

          <Button
            onClick={onClickDownload}
            disabled={isLoading}
            size="large"
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
            data={data?.data}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SaleReport
