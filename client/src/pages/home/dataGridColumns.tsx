import { formatISOToLocale, formatRupiah } from "@/utils"
import { GridColDef, GridColumns, gridNumberComparator } from "@mui/x-data-grid"
import { t } from "i18next"

type Unpacked<T> = T extends (infer U)[] ? U : T

const defaultGridColumnOptions: Omit<GridColDef, "field"> = {
  disableColumnMenu: true,
  disableExport: true,
  resizable: false,
  filterable: false,
  editable: false,
  align: "center",
  headerAlign: "center",
}

export const topCustomersDataGridColumns: GridColumns = [
  {
    field: "name",
    headerName: t("Name"),
    flex: 2,
    // minWidth: 160,
    ...defaultGridColumnOptions,
  },
  {
    field: "phoneNumber",
    headerName: t("Phone Number"),
    flex: 2,
    // minWidth: 160,
    ...defaultGridColumnOptions,
  },
  {
    field: "purchasedAmount",
    headerName: t("Purchased Amount"),
    flex: 2,
    // minWidth: 180,
    ...defaultGridColumnOptions,
    align: "right",
    valueGetter: (params) => formatRupiah(params.value as number),
  },
  {
    field: "createdAt",
    headerName: t("Created At"),
    flex: 2,
    // minWidth: 180,
    ...defaultGridColumnOptions,
    valueGetter: (params) => formatISOToLocale(params.value as string),
  },
]

export const recentOrdersDataGridColumns: GridColumns = [
  {
    field: "invoiceNumber",
    headerName: t("Invoice Number"),
    flex: 2,
    minWidth: 160,
    ...defaultGridColumnOptions,
  },
  {
    field: "description",
    headerName: t("Description"),
    flex: 2,
    // minWidth: 160,
    ...defaultGridColumnOptions,
    valueGetter: (params) => params.value || "-",
  },
  {
    field: "total",
    headerName: t("Total"),
    flex: 2,
    // minWidth: 180,
    ...defaultGridColumnOptions,
    align: "right",
    valueFormatter(params) {
      return formatRupiah(params.value)
    },
    valueGetter(params) {
      return params.value
    },
    sortComparator: gridNumberComparator,
  },
  {
    field: "createdByName",
    headerName: t("Cashier Name"),
    flex: 2,
    // minWidth: 180,
    ...defaultGridColumnOptions,
    valueGetter: (params) => params.row.createdBy?.name || '-'
  },
  {
    field: "createdAt",
    headerName: t("Created At"),
    flex: 2,
    // minWidth: 180,
    ...defaultGridColumnOptions,
    valueGetter: (params) => formatISOToLocale(params.value as string),
  },
]
