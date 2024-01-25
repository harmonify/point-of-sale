import { formatRupiah } from "@/utils"
import { t } from "i18next"
import { Styles, UserOptions } from "jspdf-autotable"

type ITableColumnData<T extends Record<string, any> | undefined = undefined> = {
  title: string
  type: "text" | "number" | "currency"
  iteratee: (item: T, formatted?: boolean) => React.ReactNode
  width: number
}

export const saleReportPDFColumns: (ITableColumnData<Monorepo.Api.Response.SaleReport> &
  Partial<Styles>)[] = [
  {
    title: t("Subtotal"),
    type: "currency",
    iteratee: (item, formatted = true) =>
      formatted ? formatRupiah(item.subTotal) : item.subTotal,
    width: 10,
  },
  {
    title: t("Discount on Total"),
    type: "currency",
    iteratee: (item, formatted = true) =>
      formatted ? formatRupiah(item.discountTotal) : item.discountTotal,
    width: 10,
  },
  {
    title: t("Total"),
    type: "currency",
    iteratee: (item, formatted = true) =>
      formatted ? formatRupiah(item.total) : item.total,
    width: 20,
  },
]

export const saleProductReportPDFColumns: (ITableColumnData<Monorepo.Api.Response.SaleProductRecord> &
  Partial<Styles>)[] = [
  // {
  //   label: t("Category Name"),
  //   iteratee: (item) => item.categoryName,
  // },
  {
    title: t("Barcode"),
    type: "text",
    iteratee: (item) => item.barcode,
    width: 10,
  },
  {
    title: t("Product"),
    type: "text",
    iteratee: (item) => item.productName,
    width: 25,
    cellWidth: 80,
  },
  {
    title: t("Unit"),
    type: "text",
    iteratee: (item) => item.unitName,
    width: 10,
  },
  {
    title: t("Sale Price"),
    type: "text",
    iteratee: (item, formatted = true) =>
      formatted ? formatRupiah(item.salePrice) : item.salePrice,
    width: 20,
  },
  {
    title: t("Quantity"),
    type: "number",
    iteratee: (item) => item.quantity,
    width: 5,
  },
  {
    title: t("Discount"),
    type: "text",
    iteratee: (item, formatted = true) =>
      formatted ? formatRupiah(item.discount) : item.discount,
    width: 10,
  },
  {
    title: t("Total"),
    type: "currency",
    iteratee: (item, formatted = true) =>
      formatted ? formatRupiah(item.total) : item.total,
    width: 20,
  },
  // {
  //   label: t("Created At"),
  //   iteratee: (item) => formatISOToLocale(item.createdAt as string),
  // },
]
