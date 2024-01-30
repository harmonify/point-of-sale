import { formatRupiah } from "@/utils"
import { formatISOToISODate } from "@/utils/string"
import { t } from "i18next"
import { Styles, UserOptions } from "jspdf-autotable"

type ITableColumnData<T extends Record<string, any> | undefined = undefined> = {
  title: string
  type: "text" | "number" | "currency"
  iteratee: (item: T, formatted?: boolean) => React.ReactNode
  width: number
}

export const profitLossReportPDFColumns: (ITableColumnData<Monorepo.Api.Response.ProfitLossRecord> &
  Partial<Styles>)[] = [
  {
    title: t("Product"),
    type: "text",
    iteratee: (item) => item.productName,
    width: 25,
    cellWidth: 50,
  },
  {
    title: t("Unit"),
    type: "text",
    iteratee: (item) => item.unitName,
    width: 10,
  },
  {
    title: t("Quantity"),
    type: "number",
    iteratee: (item) => item.quantity,
    width: 2,
  },
  {
    title: t("Cost Price"),
    type: "text",
    iteratee: (item, formatted = true) =>
      formatted ? formatRupiah(item.costPrice) : item.costPrice,
    width: 30,
  },
  {
    title: t("Sale Price"),
    type: "text",
    iteratee: (item, formatted = true) =>
      formatted ? formatRupiah(item.salePrice) : item.salePrice,
    width: 30,
  },
  {
    title: t("Discount"),
    type: "currency",
    iteratee: (item, formatted = true) =>
      formatted ? formatRupiah(item.discount) : item.discount,
    width: 20,
  },
  {
    title: t("Total Profit"),
    type: "currency",
    iteratee: (item, formatted = true) =>
      formatted ? formatRupiah(item.profit) : item.profit,
    width: 30,
  },
  {
    title: t("Date"),
    type: "text",
    iteratee: (item) => formatISOToISODate(item.createdAt as string),
    width: 10,
  },
]
