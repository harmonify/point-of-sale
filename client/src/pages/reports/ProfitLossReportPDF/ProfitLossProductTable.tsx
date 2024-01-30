import { formatRupiah } from "@/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import currency from "currency.js"
import { t } from "i18next"
import React, { ReactNode } from "react"

import { profitLossProductReportPDFColumns } from "./profitLossReportPDFColumns"

const ProfitLossProductTable: React.FC<{
  id: string
  data?: Monorepo.Api.Response.ProfitLossReport
}> = (props) => {
  if (!props.data) return null

  const totalWidth = profitLossProductReportPDFColumns.reduce(
    (acc, c) => acc + c.width,
    0,
  )

  return (
    <TableContainer>
      <Table id={props.id}>
        <TableHead>
          <TableRow>
            {profitLossProductReportPDFColumns.map((c, headIndex) => (
              <TableCell key={`head-${headIndex}`} align="center">
                {c.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(props.data.items) && props.data.items.length > 0 ? (
            props.data.items.map((sp, index) => (
              <TableRow key={`body-${index}`}>
                {profitLossProductReportPDFColumns.map((c, columnIndex) => (
                  <TableCell
                    key={`body-${index}${columnIndex}`}
                    style={{ width: `${(100 / totalWidth) * c.width}%` }}
                  >
                    {c.iteratee(sp)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9999}
                style={{ padding: 20, textAlign: "center" }}
              >
                <Typography component="strong">
                  {t("No records found", { ns: "message" })}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {Array.isArray(props.data.items) && props.data.items.length > 0 ? (
          <TableFooter>
            <TableRow>
              {profitLossProductReportPDFColumns.map((c, index) => {
                const renderCell = (value: ReactNode) => (
                  <TableCell key={`footer-${index}`}>
                    <Typography variant="h6">{value}</Typography>
                  </TableCell>
                )
                if (
                  !props.data ||
                  !props.data.items ||
                  props.data.items.length === 0 ||
                  !["number", "currency"].includes(c.type)
                ) {
                  return renderCell(null)
                }
                const value =
                  c.type === "number"
                    ? props.data?.items?.reduce((acc, sp) => {
                        const raw = c.iteratee(sp, false) as number
                        return acc + raw
                      }, 0)
                    : c.type === "currency"
                    ? props.data?.items?.reduce((acc, sp) => {
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
        ) : null}
      </Table>
    </TableContainer>
  )
}

export default ProfitLossProductTable
