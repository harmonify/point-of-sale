import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/layout/Container/Container"
import { useConfirmationDialog } from "@/features/dialog"
import { showSnackbar } from "@/features/snackbar"
import api, {
  useDeleteCustomerApiMutation,
  useFindAllCustomerApiQuery,
} from "@/services/api"
import Button from "@material-ui/core/Button"
import { Add } from "@material-ui/icons"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { t } from "i18next"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import renderCustomerDataGridColumns from "./dataGridColumns"

const CustomerList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteCustomerApiMutation, { isLoading: isLoadingDeleteCustomer }] =
    useDeleteCustomerApiMutation()
  const { isLoading: isLoadingFetchCustomer, isError, data: customerResponseQuery } =
    useFindAllCustomerApiQuery(
      { all: true },
      {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    )

  const customerList = customerResponseQuery ? customerResponseQuery.data : []

  const onClickCreate = () => {
    return navigate("/customers/create")
  }
  const onClickEdit = (row: Monorepo.Api.Response.CustomerResponseDto) => {
    return navigate(`/customers/${row.id}`)
  }

  const { show } = useConfirmationDialog({
    content: t("Do you want to delete this data?", {
      ns: "message",
      model: t("customer"),
    }),
    title: t("Delete Customer", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteCustomer,
  })

  const onClickDelete = (row: Monorepo.Api.Response.CustomerResponseDto) => {
    show({
      onConfirm: async () => {
        try {
          if (!row.id) {
            throw new Error()
          }
          await deleteCustomerApiMutation({ id: row.id }).unwrap()
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

  const dataGridColumns = renderCustomerDataGridColumns({
    onClickEdit,
    onClickDelete,
  })

  return (
    <Container title={t("Customers")}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onClickCreate}
        startIcon={<Add />}
      >
        {t("Create Customer", { ns: "action" })}
      </Button>

      <DataGrid
        columns={dataGridColumns}
        rows={customerList}
        loading={isLoadingFetchCustomer}
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

export default CustomerList
