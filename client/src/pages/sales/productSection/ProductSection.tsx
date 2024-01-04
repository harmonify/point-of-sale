import { useAppDispatch } from "@/app/hooks"
import SearchboxSuggestionPopup from "@/components/forms/SearchboxSuggestionPopup"
import { upsertCartItem } from "@/features/cart"
import useProductFuzzySearch from "@/pages/products/useProductFuzzySearch"
import { useFindCategoriesProductsQuery } from "@/services/api"
import { Box, CircularProgress, Grid, Paper, useTheme } from "@material-ui/core"
import React, { Component, useMemo, useState } from "react"

import Breadcrumb from "./Breadcrumb"
import CategoryTab from "./CategoryTab/CategoryTab"
import ProductTab from "./ProductTab/ProductTab"
import ProductUnitTab from "./ProductUnitTab/ProductUnitTab"
import { APP_ENV } from "@/environment"

export type ModifiedProductUnitType =
  Monorepo.Api.Response.ProductUnitInfoResponseDto & {
    product: Monorepo.Api.Response.ProductResponseDto
  }

export type ModifiedProductType = Monorepo.Api.Response.ProductResponseDto & {
  productUnits: ModifiedProductUnitType[]
}

export interface IBreadcrumbState {
  selectedCategory?: Monorepo.Api.Response.CategoryResponseDto | null
  selectedProduct?: ModifiedProductType | null
}

const initialBreadcrumbState = {
  selectedCategory: null,
  selectedProduct: null,
} satisfies IBreadcrumbState

const ProductSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()

  const {
    isLoading: isFetchCategoryProductLoading,
    data: categoriesProductsResponseQuery,
  } = useFindCategoriesProductsQuery(
    { all: true },
    {
      // pollingInterval: APP_ENV === "production" ? 60000 : undefined, // TODO: make this configurable
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  )
  const categoryList = useMemo(() => {
    return categoriesProductsResponseQuery
      ? categoriesProductsResponseQuery.data
      : []
  }, [categoriesProductsResponseQuery])
  const productList = useMemo(
    () =>
      categoriesProductsResponseQuery
        ? categoriesProductsResponseQuery.data.flatMap(
            (category, categoryIdx) =>
              category.products.map<ModifiedProductType>((product, idx) => {
                return {
                  ...product,
                  idx: categoryIdx * idx + 1,
                  productUnits: (
                    product as Monorepo.Api.Response.ProductResponseDto
                  ).productUnits.map((pu) => ({
                    ...pu,
                    product,
                  })),
                }
              }),
          )
        : [],
    [categoriesProductsResponseQuery],
  )

  const [breadcrumbState, setBreadcrumbState] = useState<IBreadcrumbState>(
    initialBreadcrumbState,
  )

  const {
    search,
    loading: searchLoading,
    items: searchResults,
  } = useProductFuzzySearch(productList)

  const handleSelectSuggestion = (product: ModifiedProductType) => {
    setBreadcrumbState({
      selectedCategory: product.category,
      selectedProduct: product,
    })
  }

  const handleSelectCategory = (
    category: Monorepo.Api.Response.CategoryResponseDto,
  ) => {
    setBreadcrumbState({
      selectedCategory: category,
      selectedProduct: null,
    })
  }

  const handleSelectProduct = (product: ModifiedProductType) => {
    setBreadcrumbState({
      selectedCategory: product.category,
      selectedProduct: product,
    })
  }

  const handleAddUnit = (
    productUnit: ModifiedProductUnitType,
    inputQuantity: number,
  ) => {
    dispatch(
      upsertCartItem({
        productUnitId: productUnit.id,
        name: productUnit.product.name,
        unitName: productUnit.unit.name,
        salePrice: productUnit.price,
        quantity: inputQuantity,
        inputDiscount: 0,
        discountType: "PERCENTAGE",
        inputTax: 0,
        taxType: "PERCENTAGE",
      }),
    )
  }

  return (
    <Grid container spacing={1} alignItems="stretch">
      <Grid item xs={12}>
        <SearchboxSuggestionPopup
          // autoFocus
          name="search-product"
          margin="none"
          fullWidth
          data={searchResults}
          onSelected={handleSelectSuggestion}
          onValueChange={(term) => search(term)}
          // renderListItem={(d) => ()}
          loading={isFetchCategoryProductLoading || searchLoading}
        />
      </Grid>

      <Grid item xs={12}>
        <Breadcrumb
          selectedCategoryName={breadcrumbState.selectedCategory?.name}
          selectedProductName={breadcrumbState.selectedProduct?.name}
          onClickHome={() => {
            setBreadcrumbState({
              selectedProduct: null,
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

      <Grid
        item
        xs={12}
        component={Paper}
        style={{
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(2),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isFetchCategoryProductLoading ? (
          <Box
            minHeight={300}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        ) : breadcrumbState.selectedProduct ? (
          <ProductUnitTab
            rows={breadcrumbState.selectedProduct.productUnits}
            onAddUnit={handleAddUnit}
          />
        ) : breadcrumbState.selectedCategory ? (
          <ProductTab rows={productList} onSelect={handleSelectProduct} />
        ) : (
          <CategoryTab rows={categoryList} onSelect={handleSelectCategory} />
        )}
      </Grid>
    </Grid>
  )
}

export default ProductSection
