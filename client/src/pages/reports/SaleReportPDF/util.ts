import jsPDF from "jspdf"
import autoTable, { Styles, UserOptions } from "jspdf-autotable"
import {
  saleProductReportPDFColumns,
  saleReportPDFColumns,
} from "./saleReportPDFColumns"

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

export const generateSaleReportPDF = (params: {
  title: string
  saleSummaryTableId: string
  saleProductTableId: string
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
    html: `#${params.saleSummaryTableId}`,
  })
  autoTable(doc, {
    ...defaultPdfTableStyles,
    html: `#${params.saleProductTableId}`,
    columns: saleProductReportPDFColumns,
    columnStyles: saleProductReportPDFColumns.reduce((acc, column, index) => {
      acc[index] = column
      return acc
    }, {} as Record<number, Partial<Styles>>),
  })
  return doc.save(params.fileName)
}
