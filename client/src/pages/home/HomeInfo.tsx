import { useAppSelector } from "@/app/hooks"
import CircularLoader from "@/components/controls/loader/CircularLoader"
import { selectCurrentUser } from "@/features/auth"
import { useConfirmationDialog } from "@/features/dialog"
import { useGetDashboardInfoQuery } from "@/services/api"
import { logger } from "@/services/logger"
import { formatISOToLocale, formatRupiah } from "@/utils"
import {
  Box,
  Card,
  CardContent,
  Grid,
  Icon,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { AttachMoney, Money, MoneyOff, People } from "@material-ui/icons"
import { DataGrid, GridColumns } from "@mui/x-data-grid"
import { t } from "i18next"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line
export const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  datagrid: {
    display: "flex",
    position: "relative",
    width: "100%",
    minHeight: "380px",
    flexDirection: "column",
    "& .MuiFormGroup-options": {
      alignItems: "center",
      paddingBottom: theme.spacing(1),
      "& > div": {
        minWidth: 100,
        margin: theme.spacing(2, 2, 2, 0),
      },
    },
  },
}))

const HomeInfo: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const user = useAppSelector(selectCurrentUser)

  const { data, isError, isFetching } = useGetDashboardInfoQuery(null, {
    // pollingInterval: 15000,
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (isError) return navigate("/error")
  }, [isError])

  const {
    totalSales,
    totalExpenses,
    totalCustomers,
    topCustomers = [],
    recentOrders = [],
  } = data?.data || {}

  const topCustomersDataGridColumns: GridColumns = [
    {
      field: "name",
      headerName: t("Name"),
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
      field: "purchasedAmount",
      headerName: t("Purchased Amount"),
      flex: 2,
      minWidth: 220,
      valueGetter: (params) => formatRupiah(params.value as number),
    },
    {
      field: "createdAt",
      headerName: t("Created At"),
      flex: 2,
      minWidth: 260,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
  ]

  const recentOrdersDataGridColumns: GridColumns = [
    {
      field: "customerName",
      headerName: t("Customer Name"),
      flex: 2,
      minWidth: 160,
    },
    {
      field: "description",
      headerName: t("Description"),
      flex: 2,
      minWidth: 200,
    },
    {
      field: "netAmount",
      headerName: t("Net Amount"),
      flex: 2,
      minWidth: 220,
      valueGetter: (params) => formatRupiah(params.value as number),
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
    <Grid container className={classes.root} spacing={1} wrap="wrap">
      <Grid item xs={12}>
        <Typography style={{ margin: ".2em", marginLeft: 0 }} variant="h1">
          {t("Hello!", { ns: "message", name: user?.name })}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography style={{ margin: ".2em", marginLeft: 0, fontWeight: 500 }} variant="h4">
          {t("Welcome to POS", { ns: "message" })}
        </Typography>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Box className={classes.cardHeader}>
              <Icon>
                <AttachMoney />
              </Icon>
              <Typography
                style={{ margin: ".2em", marginLeft: 0 }}
                variant="h2"
              >
                {t("Sales")}
              </Typography>
            </Box>
            <Typography style={{ margin: ".2em", marginLeft: 0, fontWeight: 500 }} variant="h2">
              {formatRupiah(totalSales)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Box className={classes.cardHeader}>
              <Icon>
                <MoneyOff />
              </Icon>
              <Typography
                style={{ margin: ".2em", marginLeft: 0 }}
                variant="h2"
              >
                {t("Expenses")}
              </Typography>
            </Box>
            <Typography style={{ margin: ".2em", marginLeft: 0, fontWeight: 500 }} variant="h2">
              {formatRupiah(totalExpenses)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Box className={classes.cardHeader}>
              <Icon>
                <People />
              </Icon>
              <Typography
                style={{ margin: ".2em", marginLeft: 0 }}
                variant="h2"
              >
                {t("Customers")}
              </Typography>
            </Box>
            <Typography style={{ margin: ".2em", marginLeft: 0, fontWeight: 500 }} variant="h2">
              {totalCustomers}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <DataGrid
          className={classes.datagrid}
          columns={topCustomersDataGridColumns}
          rows={topCustomers}
          loading={isFetching}
          disableSelectionOnClick
          disableDensitySelector
          pageSize={5}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <DataGrid
          className={classes.datagrid}
          columns={recentOrdersDataGridColumns}
          rows={recentOrders}
          loading={isFetching}
          disableSelectionOnClick
          disableDensitySelector
          pageSize={5}
        />
      </Grid>
    </Grid>
  )
}

export default HomeInfo
