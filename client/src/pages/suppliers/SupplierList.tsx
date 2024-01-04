import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/layout/Container/Container"
import { useConfirmationDialog } from "@/features/dialog"
import { showSnackbar } from "@/features/snackbar"
import api, {
  useDeleteSupplierApiMutation,
  useFindAllSupplierApiQuery,
} from "@/services/api"
import Button from "@mui/material/Button"
import { Add } from "@mui/icons-material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { t } from "i18next"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import renderSupplierDataGridColumns from "./dataGridColumns"

const SupplierList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteSupplierApiMutation, { isLoading: isLoadingDeleteSupplier }] =
    useDeleteSupplierApiMutation()
  const { isLoading: isLoadingFetchSupplier, data: supplierResponseQuery } =
    useFindAllSupplierApiQuery(
      { all: true },
      {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    )

  const supplierList = supplierResponseQuery ? supplierResponseQuery.data : []

  const onClickCreate = () => {
    return navigate("/suppliers/create")
  }
  const onClickEdit = (row: Monorepo.Api.Response.SupplierResponseDto) => {
    return navigate(`/suppliers/${row.id}`)
  }

  const { show } = useConfirmationDialog({
    content: t("Do you want to delete this data?", {
      ns: "message",
      model: t("supplier"),
    }),
    title: t("Delete Supplier", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteSupplier,
  })

  const onClickDelete = (row: Monorepo.Api.Response.SupplierResponseDto) => {
    show({
      onConfirm: async () => {
        try {
          if (!row.id) {
            throw new Error()
          }
          await deleteSupplierApiMutation({ id: row.id }).unwrap()
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

  const dataGridColumns = renderSupplierDataGridColumns({
    onClickDelete,
    onClickEdit,
  })

  return (
    <Container title={t("Suppliers")}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onClickCreate}
        startIcon={<Add />}
      >
        {t("Create Supplier", { ns: "action" })}
      </Button>

      <DataGrid
        columns={dataGridColumns}
        rows={supplierList}
        loading={isLoadingFetchSupplier}
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

export default SupplierList
