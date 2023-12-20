import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/controls/Container"
import Searchbox from "@/components/controls/Searchbox"
import YesNo from "@/features/dialog/YesNo"
import { showSnackbar } from "@/features/snackbar"
import api, {
  useDeleteCustomerApiMutation,
  useLazyFindAllCustomerApiQuery,
} from "@/services/api"
import { logger } from "@/services/logger"
import { IconButton } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { Add, Delete, Edit, FormatListBulleted } from "@material-ui/icons"
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"

import { useStyles } from "./styles"
import { t } from "i18next"

// import DataGrid from "../../components/controls/datagrid/DataGrid"

const CustomerList: React.FC = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteCustomerApiMutation, { isLoading: isLoadingDeleteCustomer }] =
    useDeleteCustomerApiMutation()
  const [findAllCustomerApiQuery, { data: lazyCustomerResponseQuery }] =
    useLazyFindAllCustomerApiQuery()
  const initialCustomerList =
    useLoaderData() as Monorepo.Api.Response.CustomerResponseDto[]

  const customerList = lazyCustomerResponseQuery
    ? lazyCustomerResponseQuery.data
    : initialCustomerList

  const [state, setState] = useState({
    showConfirmDeleteDialog: false,
    itemToDelete: null as Monorepo.Api.Response.CustomerResponseDto | null,
  })

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
  const onClickDelete = (row: Monorepo.Api.Response.CustomerResponseDto) => {
    setState({ ...state, showConfirmDeleteDialog: true, itemToDelete: row })
  }
  const onClickConfirmDelete = async () => {
    try {
      const { id } = state.itemToDelete!
      await deleteCustomerApiMutation({ id }).unwrap()
      dispatch(
        showSnackbar({
          message: t("Customer deleted successfully"),
          variant: "success",
        }),
      )
    } finally {
      setState({
        ...state,
        showConfirmDeleteDialog: false,
        itemToDelete: null,
      })
    }
  }
  const onCancelConfirmDeleteClick = () => {
    setState({ ...state, showConfirmDeleteDialog: false })
  }

  const dataGridColumns: GridColumns = [
    {
      field: "actions",
      headerName: "Actions",
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
      headerName: "Name",
      flex: 2,
      minWidth: 140,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 2,
      minWidth: 140,
    },
    {
      field: "purchasedAmount",
      headerName: "Purchased Amount",
      flex: 2,
      minWidth: 140,
    },
    {
      field: "authorName",
      headerName: "Author",
      flex: 2,
      minWidth: 140,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 2,
      minWidth: 200,
      valueGetter(params) {
        return params.value
          ? DateTime.fromISO(params.value as string)
              .setLocale("id")
              .toLocaleString({
                weekday: "long",
                day: "2-digit",
                month: "short",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
          : "-"
      },
    },
  ]

  return (
    <Container title="Customers">
      <YesNo
        open={state.showConfirmDeleteDialog}
        message="Are you sure wan't to delete the selected item"
        onOk={onClickConfirmDelete}
        onCancel={onCancelConfirmDeleteClick}
      />

      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          size="small"
          onClick={onClickList}
          startIcon={<FormatListBulleted />}
        >
          List
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={onClickCreate}
          startIcon={<Add />}
        >
          Create
        </Button>

        <Searchbox onDebounce={onDebounceSearch} />
      </div>

      <div className={classes.wrapper}>
        <DataGrid
          className={classes.datagrid}
          columns={dataGridColumns}
          rows={customerList}
          loading={customerList.length === 0}
          components={{
            Toolbar: GridToolbar,
          }}
          logger={logger}
          disableSelectionOnClick
          disableDensitySelector
          rowsPerPageOptions={[10, 25, 100]}
          pageSize={10}
        />
      </div>
    </Container>
  )
}

export default CustomerList
