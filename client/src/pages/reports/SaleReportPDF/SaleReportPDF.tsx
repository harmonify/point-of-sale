import { Grid, TableContainer, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React, { ReactNode } from "react"

import SaleProductTable from "./SaleProductTable"
import SaleSummaryTable from "./SaleSummaryTable"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    "& .MuiTableCell-root": {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
}))

export const SaleReportPDF: React.FC<{
  saleSummaryTableId: string
  saleProductTableId: string
  title?: string
  data?: Monorepo.Api.Response.SaleReport
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
        <SaleSummaryTable id={props.saleSummaryTableId} data={props.data} />
      </Grid>

      <Grid item xs={12}>
        <SaleProductTable id={props.saleProductTableId} data={props.data} />
      </Grid>
    </Grid>
  )
}
