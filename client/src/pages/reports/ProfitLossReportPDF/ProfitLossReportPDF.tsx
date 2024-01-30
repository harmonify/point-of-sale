import { Grid, TableContainer, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React, { ReactNode } from "react"

import ProfitLossProductTable from "./ProfitLossProductTable"
import ProfitLossSummaryTable from "./ProfitLossSummaryTable"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    "& .MuiTableCell-root": {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
}))

export const ProfitLossReportPDF: React.FC<{
  summaryTableId: string
  productTableId: string
  title?: string
  data?: Monorepo.Api.Response.ProfitLossReport
  isLoading?: boolean
}> = (props) => {
  if (props.isLoading) return null

  const classes = useStyles()

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h5">{props.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <ProfitLossSummaryTable id={props.summaryTableId} data={props.data} />
      </Grid>
      <Grid item xs={12}>
        <ProfitLossProductTable id={props.productTableId} data={props.data} />
      </Grid>
    </Grid>
  )
}
