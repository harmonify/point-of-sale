import jsPDF from "jspdf"
import autoTable, { Styles, UserOptions } from "jspdf-autotable"
import { profitLossReportPDFColumns } from "./profitLossReportPDFColumns"

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
  id: string
  fileName: string
}) => {
  const doc = new jsPDF({
    format: "A4",
    unit: "px",
  })
  doc.text(params.title, 28, 10)
  autoTable(doc, {
    ...defaultPdfTableStyles,
    html: `#${params.id}`,
    columns: profitLossReportPDFColumns,
    columnStyles: profitLossReportPDFColumns.reduce((acc, column, index) => {
      acc[index] = column
      return acc
    }, {} as Record<number, Partial<Styles>>),
  })
  return doc.save(params.fileName)
}
