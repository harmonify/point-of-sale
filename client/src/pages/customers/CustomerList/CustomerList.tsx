import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/controls/Container"
import Searchbox from "@/components/controls/Searchbox"
import { useConfirmationDialog } from "@/features/dialog"
import { showSnackbar } from "@/features/snackbar"
import api, {
  useDeleteCustomerApiMutation,
  useLazyFindAllCustomerApiQuery,
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

const CustomerList: React.FC = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteCustomerApiMutation, { isLoading: isLoadingDeleteCustomer }] =
    useDeleteCustomerApiMutation()
  const [
    findAllCustomerApiQuery,
    { isLoading: isLoadingFetchCustomer, data: lazyCustomerResponseQuery },
  ] = useLazyFindAllCustomerApiQuery()
  const initialCustomerList =
    useLoaderData() as Monorepo.Api.Response.CustomerResponseDto[]

  const customerList = lazyCustomerResponseQuery
    ? lazyCustomerResponseQuery.data
    : initialCustomerList

  const onDebounceSearch = async (value: string) => {
    findAllCustomerApiQuery({ search: value })
  }
  const onClickList = () => {
    return navigate("/customers")
  }
  const onClickCreate = () => {
    return navigate("/customers/create")
  }
  const onClickEdit = (row: Monorepo.Api.Response.CustomerResponseDto) => {
    return navigate(`/customers/edit/${row.id}`)
  }

  const { show } = useConfirmationDialog({
    content: `Do you want to delete this customer?`,
    title: t("Delete Customer", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteCustomer,
  })

  const onClickDelete = (row: Monorepo.Api.Response.CustomerResponseDto) => {
    show({
      content: `Do you want to delete this customer named ${row.name}?`,
      onConfirm: async () => {
        try {
          if (!row.id) {
            throw new Error()
          }
          await deleteCustomerApiMutation({ id: row.id }).unwrap()
          await findAllCustomerApiQuery().unwrap()
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
                  params.row as Monorepo.Api.Response.CustomerResponseDto,
                )
              }
            >
              <Edit fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() =>
                onClickDelete(
                  params.row as Monorepo.Api.Response.CustomerResponseDto,
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
      headerName: t("Name", { ns: "field" }),
      flex: 2,
      minWidth: 160,
    },
    {
      field: "phoneNumber",
      headerName: t("Phone Number", { ns: "field" }),
      flex: 2,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: t("Email", { ns: "field" }),
      flex: 2,
      minWidth: 240,
    },
    {
      field: "gender",
      headerName: t("Gender", { ns: "field" }),
      flex: 2,
      minWidth: 160,
      valueGetter: (params) => formatGender(params.value as string),
      sortable: false,
    },
    {
      field: "purchasedAmount",
      headerName: t("Purchased Amount", { ns: "field" }),
      flex: 2,
      minWidth: 220,
      valueGetter: (params) => formatRupiah(params.value as number),
    },
    {
      field: "createdByName",
      headerName: t("Created By", { ns: "field" }),
      flex: 2,
      minWidth: 180,
    },
    {
      field: "createdAt",
      headerName: t("Created At", { ns: "field" }),
      flex: 2,
      minWidth: 260,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
  ]

  return (
    <Container title={t("Customers")}>
      <Box>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={onClickCreate}
          startIcon={<Add />}
        >
          {t("Create Customer", { ns: "action" })}
        </Button>

        <Searchbox onDebounce={onDebounceSearch} />
      </Box>

      <div className={classes.wrapper}>
        <DataGrid
          className={classes.datagrid}
          columns={dataGridColumns}
          rows={customerList}
          loading={isLoadingFetchCustomer}
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

export default CustomerList
