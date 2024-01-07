import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export const generateInvoicePDF = async (params: {
  el: HTMLElement
  title: string
}): Promise<void> => {
  const canvas = await html2canvas(params.el, {})
  const imgData = canvas.toDataURL("image/png")

  const pdf = new jsPDF("p", "mm", "a4")
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, "FAST", "FAST")

  return pdf.save(params.title, { returnPromise: true })
}
