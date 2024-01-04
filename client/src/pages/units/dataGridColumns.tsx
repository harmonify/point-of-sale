import { formatISOToLocale } from "@/utils"
import { IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { GridColDef, GridColumns, GridRenderCellParams } from "@mui/x-data-grid"
import { t } from "i18next"

type IUnitColumns = (GridColDef & {
  field: keyof Monorepo.Api.Response.UnitInfoResponseDto
})[]

export default function renderUnitDataGridColumns({
  onClickEdit,
  onClickDelete,
}: {
  onClickEdit: (row: Monorepo.Api.Response.UnitInfoResponseDto) => void
  onClickDelete: (row: Monorepo.Api.Response.UnitInfoResponseDto) => void
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
                  params.row as Monorepo.Api.Response.UnitInfoResponseDto,
                )
              }
            >
              <Edit fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() =>
                onClickDelete(
                  params.row as Monorepo.Api.Response.UnitInfoResponseDto,
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
    },
    {
      field: "description",
      headerName: t("Description"),
      flex: 2,
      minWidth: 160,
    },
    {
      field: "createdByName",
      headerName: t("Created By"),
      flex: 2,
      minWidth: 220,
    },
    {
      field: "createdAt",
      headerName: t("Created At"),
      flex: 2,
      minWidth: 220,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
  ] satisfies IUnitColumns
}
