import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/layout/Container/Container"
import Searchbox from "@/components/forms/Searchbox"
import { useConfirmationDialog } from "@/features/dialog"
import { showSnackbar } from "@/features/snackbar"
import api, {
  useDeleteProductApiMutation,
  useFindAllProductApiQuery,
} from "@/services/api"
import { Box, Grid } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { Add } from "@material-ui/icons"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { t } from "i18next"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import renderProductDataGridColumns from "./dataGridColumns"
import useProductFuzzySearch from "./useProductFuzzySearch"

const highlight = (text: string, indices: [number, number][]) => {
  let result = ""
  let currentIndex = 0

  indices.forEach(([startIndex, endIndex]) => {
    // Append the text before the highlight
    result += text.substring(currentIndex, startIndex)
    // Wrap the highlighted text with a <span> element and apply a CSS class
    const highlightedText = text.substring(startIndex, endIndex + 1)
    result += `<span class="highlight">${highlightedText}</span>`

    currentIndex = endIndex + 1
  })

  // Append any remaining text
  result += text.substring(currentIndex)

  return result
}

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

  const productList = useMemo(
    () => (productResponseQuery ? productResponseQuery.data : []),
    [productResponseQuery],
  )

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

  const {
    searchTerm,
    search,
    loading: searchLoading,
    items: searchResults,
  } = useProductFuzzySearch(productList)

  return (
    <Container title={t("Products")}>
      <Grid container spacing={1}>
        <Grid container item justifyContent="space-between">
          <Grid item xs={12} md="auto">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={onClickCreate}
              startIcon={<Add />}
            >
              {t("Create Product", { ns: "action" })}
            </Button>
          </Grid>

          <Grid item xs={12} md="auto">
            <Searchbox
              name="search-product"
              margin="none"
              onValueChange={(term) => search(term)}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            columns={dataGridColumns}
            rows={searchTerm.length >= 1 ? searchResults : productList}
            loading={isLoadingFetchProduct || searchLoading}
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

export default ProductList
