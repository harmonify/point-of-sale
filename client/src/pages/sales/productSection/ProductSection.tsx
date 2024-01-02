import { useAppDispatch } from "@/app/hooks"
import SearchboxSuggestionPopup from "@/components/forms/SearchboxSuggestionPopup"
import { upsertCartItem } from "@/features/cart"
import useProductFuzzySearch from "@/pages/products/useProductFuzzySearch"
import { useFindCategoriesProductsQuery } from "@/services/api"
import { Box, Grid, Paper, useTheme } from "@material-ui/core"
import React, { Component, useMemo, useState } from "react"

import Breadcrumb from "./Breadcrumb"
import CategoryTab from "./CategoryTab/CategoryTab"
import ProductTab from "./ProductTab/ProductTab"
import ProductUnitTab from "./ProductUnitTab/ProductUnitTab"

export interface IBreadcrumbState {
  selectedCategory?: Monorepo.Api.Response.CategoryResponseDto | null
  selectedProduct?: Monorepo.Api.Response.ProductResponseDto | null
}

const initialBreadcrumbState = {
  selectedCategory: null,
  selectedProduct: null,
} satisfies IBreadcrumbState

export type ModifiedProductUnitType =
  Monorepo.Api.Response.ProductUnitInfoResponseDto & {
    product: Monorepo.Api.Response.ProductResponseDto
  }

export type ModifiedProductType = Monorepo.Api.Response.ProductResponseDto & {
  idx: number
  productUnits: ModifiedProductUnitType[]
}

const ProductSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()

  const {
    isLoading: isLoadingFetchCategoriesProducts,
    data: categoriesProductsResponseQuery,
  } = useFindCategoriesProductsQuery(
    { all: true },
    {
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

  const handleSelectSuggestion = (
    product: Monorepo.Api.Response.ProductResponseDto,
  ) => {
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

  const handleSelectProduct = (
    product: Monorepo.Api.Response.ProductResponseDto,
  ) => {
    setBreadcrumbState({
      selectedCategory: product.category,
      selectedProduct: product,
    })
  }

  const handleAddUnit = (productUnit: ModifiedProductUnitType) => {
    dispatch(
      upsertCartItem({
        productUnitId: productUnit.id,
        name: productUnit.product.name,
        price: productUnit.price,
        quantity: 1,
        inputDiscount: 0,
        discountType: "percentage",
        inputTax: 0,
        taxType: "percentage",
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
        }}
      >
        {breadcrumbState.selectedProduct ? (
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
