import { formatISOToLocale, sentenceCase } from "@/utils"
import { IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { GridColumns, GridRenderCellParams } from "@mui/x-data-grid"
import { t } from "i18next"

export default function renderProcurementDataGridColumns({
  onClickEdit,
  onClickDelete,
}: {
  onClickEdit: (row: Monorepo.Api.Response.ProcurementResponseDto) => void
  onClickDelete: (row: Monorepo.Api.Response.ProcurementResponseDto) => void
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
                onClickEdit(
                  params.row as Monorepo.Api.Response.ProcurementResponseDto,
                )
              }
            >
              <Edit fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() =>
                onClickDelete(
                  params.row as Monorepo.Api.Response.ProcurementResponseDto,
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
      field: "name",
      headerName: t("Name"),
      flex: 1,
      minWidth: 200,
    },
    {
      field: "description",
      headerName: t("Description"),
      flex: 1,
      minWidth: 140,
    },
    {
      field: "supplierName",
      headerName: t("Supplier"),
      flex: 2,
      minWidth: 200,
      valueGetter(params) {
        return (params.row as Monorepo.Api.Response.ProcurementResponseDto)
          .supplier.name
      },
    },
    {
      field: "deliveryStatus",
      headerName: t("Delivery Status"),
      flex: 1,
      minWidth: 180,
      sortable: false,
      resizable: false,
      valueGetter: (params) => {
        const value = sentenceCase({ text: params.value, normalize: true })
        return t(value as any, { defaultValue: value || "-" })
      },
    },
    {
      field: "deliveredAt",
      headerName: t("Delivered At"),
      flex: 2,
      minWidth: 220,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
    {
      field: "paymentStatus",
      headerName: t("Payment Status"),
      flex: 1,
      minWidth: 180,
      sortable: false,
      valueGetter: (params) => {
        const value = sentenceCase({ text: params.value, normalize: true })
        return t(value as any, { defaultValue: value || "-" })
      },
    },
    {
      field: "payedAt",
      headerName: t("Payed At"),
      flex: 2,
      minWidth: 220,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
    {
      field: "createdByName",
      headerName: t("Created By"),
      flex: 1,
      minWidth: 200,
      valueGetter(params) {
        return (params.row as Monorepo.Api.Response.ProcurementResponseDto)
          .createdBy.name
      },
    },
    {
      field: "createdAt",
      headerName: t("Created At"),
      flex: 2,
      minWidth: 220,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
    {
      field: "updatedAt",
      headerName: t("Updated At"),
      flex: 2,
      minWidth: 220,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
  ]
}
