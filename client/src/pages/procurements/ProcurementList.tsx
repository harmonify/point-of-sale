import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/layout/Container/Container"
import { useConfirmationDialog } from "@/features/dialog"
import { showSnackbar } from "@/features/snackbar"
import api, {
  useDeleteProcurementApiMutation,
  useFindAllProcurementApiQuery,
} from "@/services/api"
import { Grid } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { Add } from "@material-ui/icons"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { t } from "i18next"
import React from "react"
import { useNavigate } from "react-router-dom"

import renderProcurementDataGridColumns from "./dataGridColumns"

const ProcurementList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [
    deleteProcurementApiMutation,
    { isLoading: isLoadingDeleteProcurement },
  ] = useDeleteProcurementApiMutation()
  const {
    isLoading: isLoadingFetchProcurement,
    data: procurementResponseQuery,
  } = useFindAllProcurementApiQuery(
    { all: true },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  )

  const procurementList = procurementResponseQuery
    ? procurementResponseQuery.data
    : []

  const onClickCreate = () => {
    return navigate("/procurements/create")
  }
  const onClickEdit = (row: Monorepo.Api.Response.ProcurementResponseDto) => {
    return navigate(`/procurements/${row.id}`)
  }

  const { show } = useConfirmationDialog({
    content: t("Do you want to delete this data?", {
      ns: "message",
      model: t("procurement"),
    }),
    title: t("Delete Procurement", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteProcurement,
  })

  const onClickDelete = (row: Monorepo.Api.Response.ProcurementResponseDto) => {
    show({
      onConfirm: async () => {
        try {
          if (!row.id) {
            throw new Error()
          }
          await deleteProcurementApiMutation({ id: row.id }).unwrap()
        } catch (e) {
          dispatch(
            showSnackbar({
              message: t("An error occured", { ns: "error" }),
              variant: "error",
            }),
          )
        }
      },
    })
  }

  const dataGridColumns = renderProcurementDataGridColumns({
    onClickDelete,
    onClickEdit,
  })

  return (
    <Container title={t("Procurements")}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onClickCreate}
            startIcon={<Add />}
          >
            {t("Create Procurement", { ns: "action" })}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            columns={dataGridColumns}
            rows={procurementList}
            loading={isLoadingFetchProcurement}
            components={{
              Toolbar: GridToolbar,
            }}
            autoHeight
            disableSelectionOnClick
            disableDensitySelector
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProcurementList
