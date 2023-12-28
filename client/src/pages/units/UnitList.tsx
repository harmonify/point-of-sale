import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/layout/Container/Container"
import { useConfirmationDialog } from "@/features/dialog"
import { showSnackbar } from "@/features/snackbar"
import api, {
  useDeleteUnitApiMutation,
  useFindAllUnitApiQuery,
} from "@/services/api"
import Button from "@material-ui/core/Button"
import { Add } from "@material-ui/icons"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { t } from "i18next"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import renderUnitDataGridColumns from "./dataGridColumns"

const UnitList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteUnitApiMutation, { isLoading: isLoadingDeleteUnit }] =
    useDeleteUnitApiMutation()
  const { isLoading: isLoadingFetchUnit, data: unitResponseQuery } =
    useFindAllUnitApiQuery(
      { all: true },
      {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    )

  const unitList = unitResponseQuery ? unitResponseQuery.data : []

  const onClickCreate = () => {
    return navigate("/units/create")
  }
  const onClickEdit = (row: Monorepo.Api.Response.UnitInfoResponseDto) => {
    return navigate(`/units/${row.id}`)
  }

  const { show } = useConfirmationDialog({
    content: t("Do you want to delete this data?", {
      ns: "message",
      model: t("unit"),
    }),
    title: t("Delete Unit", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteUnit,
  })

  const onClickDelete = (row: Monorepo.Api.Response.UnitInfoResponseDto) => {
    show({
      onConfirm: async () => {
        try {
          if (!row.id) {
            throw new Error()
          }
          await deleteUnitApiMutation({ id: row.id }).unwrap()
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

  const dataGridColumns = renderUnitDataGridColumns({
    onClickDelete,
    onClickEdit,
  })

  return (
    <Container title={t("Units")}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onClickCreate}
        startIcon={<Add />}
      >
        {t("Create Unit", { ns: "action" })}
      </Button>

      <DataGrid
        columns={dataGridColumns}
        rows={unitList}
        loading={isLoadingFetchUnit}
        components={{
          Toolbar: GridToolbar,
        }}
        autoHeight
        disableSelectionOnClick
        disableDensitySelector
      />
    </Container>
  )
}

export default UnitList
