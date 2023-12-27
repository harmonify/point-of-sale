import { useAppDispatch } from '@/app/hooks';
import Container from '@/components/controls/layout/Container/Container';
import { useConfirmationDialog } from '@/features/dialog';
import { showSnackbar } from '@/features/snackbar';
import api, { useDeleteProductApiMutation, useFindAllProductApiQuery } from '@/services/api';
import Button from '@material-ui/core/Button';
import { Add } from '@material-ui/icons';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { t } from 'i18next';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import renderProductDataGridColumns from './dataGridColumns';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteProductApiMutation, { isLoading: isLoadingDeleteProduct }] =
    useDeleteProductApiMutation()
  const { isLoading: isLoadingFetchProduct, data: productResponseQuery } =
    useFindAllProductApiQuery(
      { all: true },
      {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    )

  const productList = productResponseQuery ? productResponseQuery.data : []

  const onClickCreate = () => {
    return navigate("/products/create")
  }
  const onClickEdit = (row: Monorepo.Api.Response.ProductResponseDto) => {
    return navigate(`/products/${row.id}`)
  }

  const { show } = useConfirmationDialog({
    content: t("Do you want to delete this data?", {
      ns: "message",
      model: t("product"),
    }),
    title: t("Delete Product", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteProduct,
  })

  const onClickDelete = (row: Monorepo.Api.Response.ProductResponseDto) => {
    show({
      onConfirm: async () => {
        try {
          if (!row.id) {
            throw new Error()
          }
          await deleteProductApiMutation({ id: row.id }).unwrap()
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

  const dataGridColumns = renderProductDataGridColumns({
    onClickDelete,
    onClickEdit,
  })

  return (
    <Container title={t("Products")}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onClickCreate}
        startIcon={<Add />}
      >
        {t("Create Product", { ns: "action" })}
      </Button>

      <DataGrid
        columns={dataGridColumns}
        rows={productList}
        loading={isLoadingFetchProduct}
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

export default ProductList
