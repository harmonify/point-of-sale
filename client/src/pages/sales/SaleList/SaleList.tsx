import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/layout/Container/Container"
import { useConfirmationDialog } from "@/features/dialog"
import { showSnackbar } from "@/features/snackbar"
import api, {
  useDeleteSaleApiMutation,
  useFindAllSaleApiQuery,
} from "@/services/api"
import { Grid } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { t } from "i18next"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import renderSaleDataGridColumns from "./dataGridColumns"
import { IConfirmationDialogState } from "@/features/dialog/ConfirmationDialogProvider"

const previewSaleDialog: Omit<IConfirmationDialogState, "open"> = {
  title: t("Preview Sale", { ns: "action" }),
  disableCancelButton: true,
}

const deleteSaleDialog: Omit<IConfirmationDialogState, "open"> = {
  content: t("Do you want to delete this data?", {
    ns: "message",
    model: t("sale"),
  }),
  title: t("Delete Sale", { ns: "action" }),
  confirmText: "Delete",
  variant: "destructive",
}

const SaleList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteSaleApiMutation, { isLoading: isLoadingDeleteSale }] =
    useDeleteSaleApiMutation()
  const { isLoading: isLoadingFetchSale, data: saleResponseQuery } =
    useFindAllSaleApiQuery(
      { all: true },
      {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    )

  const saleList = useMemo(
    () => (saleResponseQuery ? saleResponseQuery.data : []),
    [saleResponseQuery],
  )

  const onClickReceipt = (row: Monorepo.Api.Response.SaleResponseDto) => {
    show(previewSaleDialog)
    // return navigate(`/sales/${row.id}`)
  }

  const { show } = useConfirmationDialog(deleteSaleDialog)

  const onClickDelete = (row: Monorepo.Api.Response.SaleResponseDto) => {
    show({
      onConfirm: async () => {
        try {
          if (!row.id) {
            throw new Error()
          }
          await deleteSaleApiMutation({ id: row.id }).unwrap()
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

  const dataGridColumns = renderSaleDataGridColumns({
    onClickDelete,
    onClickReceipt,
  })

  return (
    <Container title={t("Order List")}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DataGrid
            columns={dataGridColumns}
            rows={saleList}
            loading={isLoadingFetchSale}
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

export default SaleList
