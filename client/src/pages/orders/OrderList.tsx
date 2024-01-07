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

import renderSaleDataGridColumns from "./dataGridColumns"
import InvoicePDFContainer from "./OrderReceiptPDF/OrderReceiptPDFContainer"

const OrderList: React.FC = () => {
  const dispatch = useAppDispatch()
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

  const orderList = useMemo(
    () => (saleResponseQuery ? saleResponseQuery.data : []),
    [saleResponseQuery],
  )

  const { show } = useConfirmationDialog()

  const onClickReceipt = (row: Monorepo.Api.Response.SaleResponseDto) => {
    show(
      {
        title: t("View Order", { ns: "action" }),
        render: (
          <InvoicePDFContainer data={row} isLoading={isLoadingDeleteSale} />
        ),
        maxWidth: "sm",
        disableCancelButton: true,
        disableConfirmButton: true,
      },
      true,
    )
  }

  const onClickDelete = (row: Monorepo.Api.Response.SaleResponseDto) => {
    show(
      {
        title: t("Delete Order", { ns: "action" }),
        content: t("Do you want to delete this data?", {
          ns: "message",
          model: t("order"),
        }),
        confirmText: "Delete",
        variant: "destructive",
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
      },
      true,
    )
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
            rows={orderList}
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

export default OrderList
