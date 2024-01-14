import { formatISOToLocale } from "@/utils"
import { IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { GridColumns, GridRenderCellParams } from "@mui/x-data-grid"
import { t } from "i18next"

export default function renderProductDataGridColumns({
  onClickEdit,
  onClickDelete,
}: {
  onClickEdit: (row: Monorepo.Api.Response.ProductResponseDto) => void
  onClickDelete: (row: Monorepo.Api.Response.ProductResponseDto) => void
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
                  params.row as Monorepo.Api.Response.ProductResponseDto,
                )
              }
            >
              <Edit fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() =>
                onClickDelete(
                  params.row as Monorepo.Api.Response.ProductResponseDto,
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
      flex: 3,
      minWidth: 280,
    },
    {
      field: "description",
      headerName: t("Description"),
      flex: 2,
      minWidth: 140,
    },
    {
      field: "categoryName",
      headerName: t("Category Name"),
      flex: 3,
      minWidth: 200,
      valueGetter(params) {
        return (params.row as Monorepo.Api.Response.ProductResponseDto).category
          .name
      },
    },
    {
      field: "barcode",
      headerName: t("Barcode"),
      flex: 2,
      minWidth: 160,
      sortable: false,
    },
    {
      field: "createdByName",
      headerName: t("Created By"),
      flex: 1,
      minWidth: 220,
      valueGetter(params) {
        return (params.row as Monorepo.Api.Response.ProductResponseDto)
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
