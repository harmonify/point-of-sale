import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/layout/Container/Container"
import { useConfirmationDialog } from "@/features/dialog"
import { showSnackbar } from "@/features/snackbar"
import api, {
  useDeleteCategoryApiMutation,
  useFindAllCategoryApiQuery,
} from "@/services/api"
import Button from "@mui/material/Button"
import { Add } from "@mui/icons-material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { t } from "i18next"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import renderCategoryDataGridColumns from "./dataGridColumns"

const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteCategoryApiMutation, { isLoading: isLoadingDeleteCategory }] =
    useDeleteCategoryApiMutation()
  const { isLoading: isLoadingFetchCategory, data: categoryResponseQuery } =
    useFindAllCategoryApiQuery(
      { all: true },
      {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    )

  const categoryList = categoryResponseQuery ? categoryResponseQuery.data : []

  const onClickCreate = () => {
    return navigate("/categories/create")
  }
  const onClickEdit = (row: Monorepo.Api.Response.CategoryInfoResponseDto) => {
    return navigate(`/categories/${row.id}`)
  }

  const { show } = useConfirmationDialog({
    content: t("Do you want to delete this data?", {
      ns: "message",
      model: t("category"),
    }),
    title: t("Delete Category", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteCategory,
  })

  const onClickDelete = (
    row: Monorepo.Api.Response.CategoryInfoResponseDto,
  ) => {
    show({
      onConfirm: async () => {
        try {
          if (!row.id) {
            throw new Error()
          }
          await deleteCategoryApiMutation({ id: row.id }).unwrap()
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

  const dataGridColumns = renderCategoryDataGridColumns({
    onClickDelete,
    onClickEdit,
  })

  return (
    <Container title={t("Categories")}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onClickCreate}
        startIcon={<Add />}
      >
        {t("Create Category", { ns: "action" })}
      </Button>

      <DataGrid
        columns={dataGridColumns}
        rows={categoryList}
        loading={isLoadingFetchCategory}
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

export default CategoryList
