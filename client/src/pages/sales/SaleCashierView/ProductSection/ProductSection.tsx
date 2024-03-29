import { useAppDispatch } from "@/app/hooks"
import SearchboxSuggestionPopup from "@/components/forms/SearchboxSuggestionPopup"
import { upsertCartItem } from "@/features/cart"
import useProductFuzzySearch from "@/pages/products/useProductFuzzySearch"
import { useFindCategoriesProductsQuery } from "@/services/api"
import { Box, CircularProgress, Grid, Paper, useTheme } from "@mui/material"
import React, { Component, useEffect, useMemo, useState } from "react"

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
      pollingInterval: APP_ENV === "production" ? 30000 : 15000, // TODO: make this configurable
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  )
  const categoryList = useMemo(() => {
    return categoriesProductsResponseQuery &&
      Array.isArray(categoriesProductsResponseQuery.data)
      ? [...categoriesProductsResponseQuery.data].sort((a, b) =>
          a.name === b.name ? 0 : a.name > b.name ? 1 : -1,
        )
      : []
  }, [categoriesProductsResponseQuery])
  const productList = useMemo(() => {
    const sortedProductList = categoriesProductsResponseQuery
      ? categoriesProductsResponseQuery.data
          .flatMap(
            (
              {
                products,
              }: { products: Monorepo.Api.Response.ProductResponseDto[] },
              categoryIdx,
            ) =>
              products.map<ModifiedProductType>((product, idx) => ({
                ...product,
                idx: categoryIdx * idx + 1,
                productUnits: product.productUnits.map((pu) => ({
                  ...pu,
                  product,
                })),
              })),
          )
          .sort((a, b) => {
            const sortByName = a.name.localeCompare(b.name)

            const aUnitAvailable = a.productUnits.some(
              (pu) => pu.availableQuantity > 0,
            )
            const bUnitAvailable = b.productUnits.some(
              (pu) => pu.availableQuantity > 0,
            )

            if (aUnitAvailable && bUnitAvailable) {
              return sortByName
            } else if (aUnitAvailable) {
              return -1
            } else if (bUnitAvailable) {
              return 1
            } else {
              return sortByName
            }
          })
      : []

    return sortedProductList
  }, [categoriesProductsResponseQuery])
  // console.log(`🚀 ~ productList[0] ~ ${JSON.stringify(productList[0], null, 2)}`);

  const [breadcrumbState, setBreadcrumbState] = useState<IBreadcrumbState>(
    initialBreadcrumbState,
  )
  const selectedCategoryProductList: ModifiedProductType[] = useMemo(() => {
    return breadcrumbState.selectedCategory
      ? productList.filter(
          (p) => p.categoryId === breadcrumbState.selectedCategory?.id,
        )
      : []
  }, [breadcrumbState.selectedCategory])

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
          <ProductTab
            rows={selectedCategoryProductList}
            onSelect={handleSelectProduct}
          />
        ) : (
          <CategoryTab rows={categoryList} onSelect={handleSelectCategory} />
        )}
      </Grid>
    </Grid>
  )
}

export default ProductSection
