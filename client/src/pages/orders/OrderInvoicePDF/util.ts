import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export const a4WidthInPx = 595
export const a4HeightInPx = 842

export const MM_IN_PX = 3.7795275591

export const generateOrderInvoicePDF = async (params: {
  el: HTMLElement
  title: string
}): Promise<void> => {
  const canvas = await html2canvas(params.el, {})
  const imgData = canvas.toDataURL("image/png")

  const pdf = new jsPDF("landscape", "px", "a4", true)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, "FAST", "FAST")

  return pdf.save(params.title, { returnPromise: true })
}
