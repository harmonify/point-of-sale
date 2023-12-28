import { formatGender, formatISOToLocale, formatRupiah } from "@/utils"
import { IconButton } from "@material-ui/core"
import { Delete, Edit } from "@material-ui/icons"
import { GridColDef, GridColumns, GridRenderCellParams } from "@mui/x-data-grid"
import { t } from "i18next"

type ICustomerColumns = (GridColDef & {
  field: keyof Monorepo.Api.Response.CustomerInfoResponseDto
})[]

export default function renderCustomerDataGridColumns({
  onClickEdit,
  onClickDelete,
}: {
  onClickEdit: (row: Monorepo.Api.Response.CustomerInfoResponseDto) => void
  onClickDelete: (row: Monorepo.Api.Response.CustomerInfoResponseDto) => void
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
                  params.row as Monorepo.Api.Response.CustomerInfoResponseDto,
                )
              }
            >
              <Edit fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() =>
                onClickDelete(
                  params.row as Monorepo.Api.Response.CustomerInfoResponseDto,
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
      field: "purchasedAmount",
      headerName: t("Purchased Amount"),
      flex: 2,
      minWidth: 220,
      valueGetter: (params) => formatRupiah(params.value as number),
    },
    {
      field: "gender",
      headerName: t("Gender"),
      flex: 2,
      minWidth: 160,
      valueGetter: (params) => formatGender(params.value as string),
      sortable: false,
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
  ] satisfies ICustomerColumns
}
