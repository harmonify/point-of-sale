import { Grid, TableContainer, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React, { ReactNode } from "react"

import ProfitLossTable from "./ProfitLossTable"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    "& .MuiTableCell-root": {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
}))

export const ProfitLossReportPDF: React.FC<{
  id: string
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
        <ProfitLossTable id={props.id} data={props.data} />
      </Grid>
    </Grid>
  )
}
