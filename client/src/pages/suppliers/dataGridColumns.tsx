import { formatISOToLocale } from "@/utils"
import { IconButton } from "@material-ui/core"
import { Delete, Edit } from "@material-ui/icons"
import { GridColumns, GridRenderCellParams } from "@mui/x-data-grid"
import { t } from "i18next"

export default function renderSupplierDataGridColumns({
  onClickEdit,
  onClickDelete,
}: {
  onClickEdit: (row: Monorepo.Api.Response.SupplierResponseDto) => void
  onClickDelete: (row: Monorepo.Api.Response.SupplierResponseDto) => void
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
                  params.row as Monorepo.Api.Response.SupplierResponseDto,
                )
              }
            >
              <Edit fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() =>
                onClickDelete(
                  params.row as Monorepo.Api.Response.SupplierResponseDto,
                )
              }
            >
              <Delete fontSize="small" color="error" />
            </IconButton>
          </>
        )
      },
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
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
      field: "phoneNumber",
      headerName: t("Phone Number"),
      flex: 2,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: t("Email"),
      flex: 2,
      minWidth: 240,
    },
    {
      field: "address",
      headerName: t("Address"),
      flex: 2,
      minWidth: 240,
    },
    {
      field: "createdAt",
      headerName: t("Created At"),
      flex: 2,
      minWidth: 260,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
  ]
}
