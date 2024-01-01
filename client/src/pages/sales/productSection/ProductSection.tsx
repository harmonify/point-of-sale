import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"
import React, { Component, useMemo, useState } from "react"

import SearchboxSuggestionPopup from "@/components/forms/SearchboxSuggestionPopup"
import { useFindAllProductApiQuery } from "@/services/api"
import useProductFuzzySearch from "@/pages/products/useProductFuzzySearch"
import { useAppDispatch } from "@/app/hooks"
import { addItemToCart } from "@/features/cart"
import { t } from "i18next"
import { useConfirmationDialog } from "@/features/dialog"
import { DataGrid } from "@mui/x-data-grid"
import renderCartDataGridColumns from "./dataGridColumns"
import Breadcrumb from "./Breadcrumb"
import { logger } from "@/services/logger"

export interface IBreadcrumbState {
  selectedCategory?: string | null
  selectedProduct?: string | null
}

const initialBreadcrumbState = {
  selectedCategory: null,
  selectedProduct: null,
} satisfies IBreadcrumbState

const initialBreadcrumbStateV2 = {
  selectedCategory: "Makanan & Minuman",
  selectedProduct: "Chitato 80gr",
}

const ProductSection: React.FC = () => {
  const dispatch = useAppDispatch()

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

  const dataGridColumns = renderCartDataGridColumns({
    onClickDelete: () => ({}),
  })

  const { show } = useConfirmationDialog({
    content: t("Do you want to delete this data?", {
      ns: "message",
      model: t("product"),
    }),
    title: t("Delete Product", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
  })

  const [breadcrumbState, setBreadcrumbState] = useState<IBreadcrumbState>(
    initialBreadcrumbStateV2,
  )

  const {
    searchTerm,
    search,
    loading: searchLoading,
    items: searchResults,
  } = useProductFuzzySearch(productList)

  const handleSelectSuggestion = (
    product: Monorepo.Api.Response.ProductResponseDto,
  ) => {
    setBreadcrumbState({
      selectedCategory: product.category.name,
      selectedProduct: product.name,
    })
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        price: 100000000000, // TODO
        sellingPrice: 100000000000,
        qty: 1,
        discount: 0,
        discountTotal: 0,
        totalPrice: 100000000000,
      }),
    )
  }

  return (
    <Grid item container spacing={1}>
      <Grid item xs={12}>
        <SearchboxSuggestionPopup
          name="search-product"
          margin="none"
          fullWidth
          data={searchResults}
          onSelected={handleSelectSuggestion}
          onValueChange={(term) => search(term)}
        />
      </Grid>
      <Grid item xs={12}>
        <Breadcrumb
          selectedCategory={breadcrumbState.selectedCategory}
          selectedProduct={breadcrumbState.selectedProduct}
          onClickHome={() => {
            setBreadcrumbState({
              selectedProduct: breadcrumbState.selectedProduct,
              selectedCategory: null,
            })
          }}
          onClickCategory={() => {
            setBreadcrumbState({
              selectedCategory: breadcrumbState.selectedCategory,
              selectedProduct: null,
            })
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          columns={dataGridColumns}
          rows={searchTerm.length >= 1 ? searchResults : productList}
          loading={isLoadingFetchProduct || searchLoading}
          autoHeight
          disableSelectionOnClick
          disableDensitySelector
        />
      </Grid>
    </Grid>
  )
}

export default ProductSection
