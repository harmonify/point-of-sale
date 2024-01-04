import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material"
import React from "react"

import { saleReportPDFColumns } from "./saleReportPDFColumns"

const SaleSummaryTable: React.FC<{
  id: string
  data?: Monorepo.Api.Response.SaleReport
}> = (props) => {
  if (!props.data) return null

  return (
    <TableContainer>
      <Table id={props.id}>
        <TableBody>
          {saleReportPDFColumns.map((column, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="h6">{column.title}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  {column.iteratee(props.data!)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SaleSummaryTable
