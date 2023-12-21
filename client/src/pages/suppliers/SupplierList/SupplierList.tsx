import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/controls/layout/Container/Container"
import Searchbox from "@/components/controls/Searchbox"
import { useConfirmationDialog } from "@/features/dialog"
import { showSnackbar } from "@/features/snackbar"
import api, {
  useDeleteSupplierApiMutation,
  useFindAllSupplierApiQuery,
  useLazyFindAllSupplierApiQuery,
} from "@/services/api"
import { formatGender, formatISOToLocale, formatRupiah } from "@/utils"
import { Box, IconButton } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { Add, Delete, Edit, FormatListBulleted } from "@material-ui/icons"
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid"
import { t } from "i18next"
import React, { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"

import { useStyles } from "./styles"

// import DataGrid from "../../components/controls/datagrid/DataGrid"

const SupplierList: React.FC = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteSupplierApiMutation, { isLoading: isLoadingDeleteSupplier }] =
    useDeleteSupplierApiMutation()
  const { isLoading: isLoadingFetchSupplier, data: supplierResponseQuery } =
    useFindAllSupplierApiQuery(
      { all: true },
      {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    )

  const supplierList = supplierResponseQuery ? supplierResponseQuery.data : []

  const onClickCreate = () => {
    return navigate("/suppliers/create")
  }
  const onClickEdit = (row: Monorepo.Api.Response.SupplierResponseDto) => {
    return navigate(`/suppliers/edit/${row.id}`)
  }

  const { show } = useConfirmationDialog({
    content: t("Do you want to delete this data?", {
      ns: "message",
      model: t("supplier"),
    }),
    title: t("Delete Supplier", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteSupplier,
  })

  const onClickDelete = (row: Monorepo.Api.Response.SupplierResponseDto) => {
    show({
      onConfirm: async () => {
        try {
          if (!row.id) {
            throw new Error()
          }
          await deleteSupplierApiMutation({ id: row.id }).unwrap()
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

  const dataGridColumns: GridColumns = [
    {
      field: "actions",
      headerName: t("Actions"),
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <IconButton
              size="small"
              onClick={() =>
                onClickEdit(
                  params.row as Monorepo.Api.Response.SupplierResponseDto,
                )
              }
            >
              <Edit fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() =>
                onClickDelete(
                  params.row as Monorepo.Api.Response.SupplierResponseDto,
                )
              }
            >
              <Delete fontSize="small" color="error" />
            </IconButton>
          </>
        )
      },
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: t("Name"),
      flex: 2,
      minWidth: 160,
    },
    {
      field: "description",
      headerName: t("Description"),
      flex: 2,
      minWidth: 160,
    },
    {
      field: "phoneNumber",
      headerName: t("Phone Number"),
      flex: 2,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: t("Email"),
      flex: 2,
      minWidth: 240,
    },
    {
      field: "address",
      headerName: t("Address"),
      flex: 2,
      minWidth: 240,
    },
    {
      field: "createdAt",
      headerName: t("Created At"),
      flex: 2,
      minWidth: 260,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
  ]

  return (
    <Container title={t("Suppliers")}>
      <Box>
        <Button
          className={classes.createButton}
          variant="contained"
          color="primary"
          size="small"
          onClick={onClickCreate}
          startIcon={<Add />}
        >
          {t("Create Supplier", { ns: "action" })}
        </Button>
      </Box>

      <div className={classes.wrapper}>
        <DataGrid
          className={classes.datagrid}
          columns={dataGridColumns}
          rows={supplierList}
          loading={isLoadingFetchSupplier}
          components={{
            Toolbar: GridToolbar,
          }}
          disableSelectionOnClick
          disableDensitySelector
          rowsPerPageOptions={[10, 25, 100]}
          pageSize={10}
          paginationMode="client"
        />
      </div>
    </Container>
  )
}

export default SupplierList
