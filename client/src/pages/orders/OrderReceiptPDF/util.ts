import { isNumber } from "@/utils/number"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export const receiptPdfHeightMm = 75
export const receiptPdfWidthMm = 65

export const MM_IN_PX = 3.7795275591

/**
 * @returns [height, width]
 */
export const getReceiptPdfSizeInPx = (factor?: number): [number, number] => {
  const finalFactor = isNumber(factor) ? factor : MM_IN_PX
  return [receiptPdfHeightMm * finalFactor, receiptPdfWidthMm * finalFactor]
}

export const generateOrderPDF = async (params: {
  el: HTMLElement
  title: string
  width: number
  height: number
}): Promise<void> => {
  const canvas = await html2canvas(params.el, {})
  const imgData = canvas.toDataURL("image/png")

  const pdf = new jsPDF("p", "px", [params.height, params.width], true)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, "FAST", "FAST")

  return pdf.save(params.title, { returnPromise: true })
}
