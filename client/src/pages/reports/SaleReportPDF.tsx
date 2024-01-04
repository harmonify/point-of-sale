import { formatRupiah } from "@/utils"
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import currency from "currency.js"
import { t } from "i18next"
import React, { ReactNode } from "react"

import { saleReportPDFColumns } from "./saleReportPDFColumns"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    "& .MuiTableCell-root": {
      border: `1px solid ${theme.palette.divider}`,
    },
    "& .MuiTypography-h6": {
      fontWeight: 500,
    },
    "& .MuiTypography-body1": {
      fontSize: "14px",
    },
    "& .MuiInputBase-input": {
      // fontSize: "14px",
      fontWeight: 600,
    },
  },
}))

const SaleSummaryTable: React.FC<{
  id: string
  data?: Monorepo.Api.Response.SaleReport
}> = (props) => {
  if (!props.data) return null

  const columns = [
    {
      label: t("Subtotal"),
      value: formatRupiah(props.data.subTotal),
    },
    {
      label: t("Discount Total"),
      value: formatRupiah(props.data.discountTotal),
    },
    {
      label: t("Total"),
      value: formatRupiah(props.data.total),
    },
  ]

  return (
    <Table id={props.id}>
      <TableBody>
        {columns.map((column, index) => (
          <TableRow key={index}>
            <TableCell>{column.label}</TableCell>
            <TableCell>{column.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const SaleProductTable: React.FC<{
  id: string
  data?: Monorepo.Api.Response.SaleReport
}> = (props) => {
  if (!props.data) return null

  const totalWidth = saleReportPDFColumns.reduce((acc, c) => acc + c.width, 0)

  return (
    <Table id={props.id}>
      <TableHead>
        <TableRow>
          {saleReportPDFColumns.map((c, headIndex) => (
            <TableCell key={`head-${headIndex}`} align="center">
              {c.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.saleProducts.map((sp, index) => (
          <TableRow key={`body-${index}`}>
            {saleReportPDFColumns.map((c, columnIndex) => (
              <TableCell
                key={`body-${index}${columnIndex}`}
                style={{ width: `${(100 / totalWidth) * c.width}%` }}
              >
                {c.iteratee(sp)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {saleReportPDFColumns.map((c, index) => {
            const renderCell = (value: ReactNode) => (
              <TableCell key={`footer-${index}`}>{value}</TableCell>
            )
            if (
              !props.data ||
              props.data.saleProducts.length === 0 ||
              !["number", "currency"].includes(c.type)
            ) {
              return renderCell(null)
            }
            const value =
              c.type === "number"
                ? props.data?.saleProducts.reduce((acc, sp) => {
                    const raw = c.iteratee(sp, false) as number
                    return acc + raw
                  }, 0)
                : c.type === "currency"
                ? props.data?.saleProducts.reduce((acc, sp) => {
                    const raw = c.iteratee(sp, false) as number
                    return acc.add(raw)
                  }, currency(0.0)).value
                : null
            return renderCell(
              !value || c.type === "text"
                ? null
                : c.type === "currency"
                ? formatRupiah(value)
                : value,
            )
          })}
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export const SaleReportPDF: React.FC<{
  saleSummaryTableId: string
  saleProductTableId: string
  title: string
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
        <TableContainer>
          <SaleSummaryTable id={props.saleSummaryTableId} data={props.data} />
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <TableContainer>
          <SaleProductTable id={props.saleProductTableId} data={props.data} />
        </TableContainer>
      </Grid>
    </Grid>
  )
}
