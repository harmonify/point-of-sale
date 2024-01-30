import jsPDF from "jspdf"
import autoTable, { Styles, UserOptions } from "jspdf-autotable"
import { profitLossProductReportPDFColumns } from "./profitLossReportPDFColumns"

export const defaultPdfTableStyles: UserOptions = {
  styles: {
    fontSize: 10,
    minCellHeight: 20,
  },
  headStyles: {
    halign: "center",
    valign: "middle",
  },
  theme: "grid",
}

export const generateProfitLossReportPDF = (params: {
  title: string
  summaryTableId: string
  productTableId: string
  fileName: string
}) => {
  const doc = new jsPDF({
    format: "A4",
    unit: "px",
  })
  doc.text(params.title, 28, 10)
  autoTable(doc, {
    ...defaultPdfTableStyles,
    styles: { fontStyle: "bold" },
    html: `#${params.summaryTableId}`,
  })
  autoTable(doc, {
    ...defaultPdfTableStyles,
    html: `#${params.productTableId}`,
    columns: profitLossProductReportPDFColumns,
    columnStyles: profitLossProductReportPDFColumns.reduce((acc, column, index) => {
      acc[index] = column
      return acc
    }, {} as Record<number, Partial<Styles>>),
  })
  return doc.save(params.fileName)
}
