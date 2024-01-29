import { formatISOToLocale } from "@/utils"
import { IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { GridColDef, GridColumns, GridRenderCellParams } from "@mui/x-data-grid"
import { t } from "i18next"

type ISupplierColumns = (GridColDef & {
  field: keyof Monorepo.Api.Response.SupplierInfoResponseDto
})[]

export default function renderSupplierDataGridColumns({
  onClickEdit,
  onClickDelete,
}: {
  onClickEdit: (row: Monorepo.Api.Response.SupplierInfoResponseDto) => void
  onClickDelete: (row: Monorepo.Api.Response.SupplierInfoResponseDto) => void
}): GridColumns {
  return [
    {
      // @ts-ignore
      field: "actions",
      headerName: t("Actions"),
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <IconButton
              size="small"
              onClick={() =>
                onClickEdit(
                  params.row as Monorepo.Api.Response.SupplierInfoResponseDto,
                )
              }
            >
              <Edit fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() =>
                onClickDelete(
                  params.row as Monorepo.Api.Response.SupplierInfoResponseDto,
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
      flex: 2,
      minWidth: 160,
      valueFormatter: (params) => params.value || "-",
    },
    {
      field: "description",
      headerName: t("Description"),
      flex: 2,
      minWidth: 160,
      valueFormatter: (params) => params.value || "-",
    },
    {
      field: "phoneNumber",
      headerName: t("Phone Number"),
      flex: 2,
      minWidth: 200,
      valueFormatter: (params) => params.value || "-",
    },
    {
      field: "email",
      headerName: t("Email"),
      flex: 2,
      minWidth: 240,
      valueFormatter: (params) => params.value || "-",
    },
    {
      field: "address",
      headerName: t("Address"),
      flex: 2,
      minWidth: 240,
      valueFormatter: (params) => params.value || "-",
    },
    {
      field: "createdByName",
      headerName: t("Created By"),
      flex: 2,
      minWidth: 220,
      valueFormatter: (params) => params.value || "-",
    },
    {
      field: "createdAt",
      headerName: t("Created At"),
      flex: 2,
      minWidth: 220,
      valueFormatter: (params) => formatISOToLocale(params.value as string),
    },
  ] satisfies ISupplierColumns
}
