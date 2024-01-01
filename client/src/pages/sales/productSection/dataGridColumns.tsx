import { CartItemState } from "@/features/cart"
import { formatISOToLocale } from "@/utils"
import { IconButton } from "@material-ui/core"
import { Delete, Edit } from "@material-ui/icons"
import { GridColDef, GridColumns, GridRenderCellParams } from "@mui/x-data-grid"
import { t } from "i18next"

type IUnitColumns = (GridColDef & {
  field: keyof CartItemState
})[]

export default function renderCartDataGridColumns({
  onClickDelete,
}: {
  onClickDelete: (row: CartItemState) => void
}): GridColumns {
  return [
    {
      field: "id",
      headerName: t("Num"),
      valueGetter(params) {
        return params.id
      },
      sortable: false,
      disableColumnMenu: true,
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
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      filterable: false,
      editable: false,
    },
    {
      field: "sellingPrice",
      headerName: t("Selling Price"),
      flex: 2,
      minWidth: 160,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      filterable: false,
      editable: false,
    },
    {
      field: "qty",
      headerName: t("Qty"),
      flex: 2,
      minWidth: 160,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      filterable: false,
      editable: false,
    },
    {
      field: "totalPrice",
      headerName: t("Total Price"),
      flex: 2,
      minWidth: 160,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      filterable: false,
      editable: false,
    },
    {
      // @ts-ignore
      field: "actions",
      headerName: t("Actions"),
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <IconButton
              size="small"
              onClick={() => onClickDelete(params.row as CartItemState)}
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
  ] satisfies IUnitColumns
}
