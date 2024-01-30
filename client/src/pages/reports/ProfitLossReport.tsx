import Container from "@/components/layout/Container/Container"
import { useLazyGetProfitLossReportQuery } from "@/services/api"
import { Print, Search } from "@mui/icons-material"
import { Button, CircularProgress, Grid, useTheme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { DatePicker } from "@mui/x-date-pickers"
import { t } from "i18next"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"

import { ProfitLossReportPDF } from "./ProfitLossReportPDF/ProfitLossReportPDF"
import { generateProfitLossReportPDF } from "./ProfitLossReportPDF/util"
import { APP, DATE_FORMAT } from "@/constants"

const today = DateTime.now().startOf("day")
const todayISO = today.toISODate()
const profitLossSummaryTableId = "range-date-profit-loss-summary-table"
const profitLossProductTableId = "range-date-profit-loss-table"
const getTitle = (from: string, to: string) => {
  return `${t("Profit Loss Report")} ${from} s.d. ${to}`
}
const getFileName = (from: string, to: string) => {
  return `${APP.name}_${t("Profit Loss Report")}_${from}_${to}.pdf`
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    "& > *": {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  },
}))

const ProfitLossReport = () => {
  const theme = useTheme()

  const classes = useStyles()

  const [dateFrom, setDateFrom] = useState(today)
  const [dateTo, setDateTo] = useState(today)

  const [getProfitLossReportQuery, { data, isLoading }] =
    useLazyGetProfitLossReportQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
    })

  useEffect(() => {
    getProfitLossReportQuery({ from: todayISO, to: todayISO })
  }, [])

  const onClickSearch = () => {
    return getProfitLossReportQuery({
      from: dateFrom.toISODate(),
      to: dateTo.toISODate(),
    })
  }

  const onClickDownload = async () => {
    await onClickSearch()
    const fromISO = dateFrom.toISODate()!
    const toISO = dateTo.toISODate()!
    generateProfitLossReportPDF({
      title: getTitle(fromISO, toISO),
      productTableId: profitLossProductTableId,
      summaryTableId: profitLossSummaryTableId,
      fileName: getFileName(fromISO, toISO),
    })
  }

  return (
    <Container title={t("Profit Loss Report")}>
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
          <ProfitLossReportPDF
            summaryTableId={profitLossSummaryTableId}
            productTableId={profitLossProductTableId}
            data={data?.data}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProfitLossReport
