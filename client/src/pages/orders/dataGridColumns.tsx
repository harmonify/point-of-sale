import { formatISOToLocale, formatRupiah } from "@/utils"
import { IconButton } from "@mui/material"
import { Delete, Edit, Receipt } from "@mui/icons-material"
import {
  GridColumns,
  GridRenderCellParams,
  gridNumberComparator,
} from "@mui/x-data-grid"
import { t } from "i18next"

export default function renderSaleDataGridColumns({
  onClickReceipt,
  onClickDelete,
}: {
  onClickReceipt: (row: Monorepo.Api.Response.SaleResponseDto) => void
  onClickDelete: (row: Monorepo.Api.Response.SaleResponseDto) => void
}): GridColumns {
  return [
    {
      field: "actions",
      headerName: t("Actions"),
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <IconButton
              size="small"
              onClick={() =>
                onClickReceipt(
                  params.row as Monorepo.Api.Response.SaleResponseDto,
                )
              }
            >
              <Receipt fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() =>
                onClickDelete(
                  params.row as Monorepo.Api.Response.SaleResponseDto,
                )
              }
            >
              <Delete fontSize="small" color="error" />
            </IconButton>
          </>
        )
      },
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      disableReorder: true,
      resizable: false,
      filterable: false,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "invoiceNumber",
      headerName: t("Invoice Number"),
      flex: 3,
      minWidth: 200,
    },
    {
      field: "customerName",
      headerName: t("Customer Name"),
      flex: 3,
      minWidth: 200,
      valueGetter(params) {
        return (
          (params.row as Monorepo.Api.Response.SaleResponseDto).customer
            ?.name || "-"
        )
      },
    },
    {
      field: "subTotal",
      headerName: t("Subtotal"),
      flex: 2,
      minWidth: 160,
      valueFormatter(params) {
        return formatRupiah(params.value)
      },
      valueGetter(params) {
        return params.value
      },
      sortComparator: gridNumberComparator,
    },
    {
      field: "discountTotal",
      headerName: t("Discount on Total"),
      flex: 2,
      minWidth: 160,
      valueFormatter(params) {
        return formatRupiah(params.value)
      },
      valueGetter(params) {
        return params.value
      },
      sortComparator: gridNumberComparator,
    },
    {
      field: "total",
      headerName: t("Total"),
      flex: 2,
      minWidth: 160,
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
      headerName: t("Created By"),
      flex: 1,
      minWidth: 220,
      valueGetter(params) {
        return (params.row as Monorepo.Api.Response.SaleResponseDto).createdBy
          .name
      },
    },
    {
      field: "createdAt",
      headerName: t("Created At"),
      flex: 2,
      minWidth: 220,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
  ]
}
