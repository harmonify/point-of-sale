import { formatISOToLocale, formatRupiah } from "@/utils"
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { t } from "i18next"
import React, { ReactNode } from "react"

const SaleSummaryTable: React.FC<{
  data?: Monorepo.Api.Response.SaleReport
}> = (props) => {
  if (!props.data) return null

  const rows = [
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
    <Table>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.label}</TableCell>
            <TableCell colSpan={3}>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const SaleProductTable: React.FC<{
  data?: Monorepo.Api.Response.SaleReport
}> = (props) => {
  if (!props.data) return null

  const columns: {
    label: string
    iteratee: (item: Monorepo.Api.Response.SaleProductRecord) => ReactNode
  }[] = [
    {
      label: t("Barcode"),
      iteratee: (item) => item.barcode,
    },
    {
      label: t("Product Name"),
      iteratee: (item) => item.productName,
    },
    {
      label: t("Unit Name"),
      iteratee: (item) => item.unitName,
    },
    {
      label: t("Sale Price"),
      iteratee: (item) => formatRupiah(item.discount),
    },
    {
      label: t("Quantity"),
      iteratee: (item) => item.quantity,
    },
    {
      label: t("Discount"),
      iteratee: (item) => formatRupiah(item.discount),
    },
    {
      label: t("Total"),
      iteratee: (item) => formatRupiah(item.total),
    },
    {
      label: t("Created At"),
      iteratee: (item) => formatISOToLocale(item.createdAt as string),
    },
  ]

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((c, index) => (
            <TableCell key={index}>{c.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.saleProducts.map((sp, index) => (
          <TableRow key={index}>
            {columns.map((c, index) => (
              <TableCell key={index}>{c.iteratee(sp)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const TodaySaleReportPDF: React.FC<{
  data?: Monorepo.Api.Response.SaleReport
  isLoading?: boolean
}> = (props) => {
  if (!props.isLoading) return null

  return (
    <Grid container>
      <Grid item xs={12}>
        <SaleSummaryTable data={props.data} />
      </Grid>

      <Grid item xs={12}>
        <SaleProductTable data={props.data} />
      </Grid>
    </Grid>
  )
}
