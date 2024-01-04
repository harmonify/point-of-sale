import { useAppSelector } from "@/app/hooks"
import { APP_ENV } from "@/environment"
import { selectCurrentUser } from "@/features/auth"
import { useGetDashboardInfoQuery } from "@/services/api"
import { formatISOToLocale, formatRupiah } from "@/utils"
import {
  Box,
  Card,
  CardContent,
  Grid,
  Icon,
  Typography,
} from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import {
  AttachMoney,
  MonetizationOn,
  MoneyOff,
  People,
} from "@material-ui/icons"
import { DataGrid, GridColDef, GridColumns } from "@mui/x-data-grid"
import { t } from "i18next"
import React, { useEffect } from "react"

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
    minHeight: 200,
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
    minHeight: "240px",
    flexDirection: "column",
    "& .MuiFormGroup-options": {
      alignItems: "center",
      paddingBottom: theme.spacing(1),
      "& > div": {
        // minWidth: 100,
        margin: theme.spacing(2, 2, 2, 0),
      },
    },
  },
}))

type Unpacked<T> = T extends (infer U)[] ? U : T

const HomeInfo: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const user = useAppSelector(selectCurrentUser)

  const { data, isFetching } = useGetDashboardInfoQuery(null, {
    pollingInterval: APP_ENV === "production" ? 60000 : undefined,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const {
    totalSales,
    totalExpenses,
    totalCustomers,
    topCustomers = [],
    recentOrders = [],
  } = data?.data || {}

  const defaultGridColumnOptions: Omit<GridColDef, "field"> = {
    disableColumnMenu: true,
    disableExport: true,
    resizable: false,
    filterable: false,
    editable: false,
    align: "center",
    headerAlign: "center",
  }

  const topCustomersDataGridColumns: GridColumns = [
    {
      field: "name",
      headerName: t("Name"),
      flex: 2,
      // minWidth: 160,
      ...defaultGridColumnOptions,
    },
    {
      field: "phoneNumber",
      headerName: t("Phone Number"),
      flex: 2,
      // minWidth: 160,
      ...defaultGridColumnOptions,
    },
    {
      field: "purchasedAmount",
      headerName: t("Purchased Amount"),
      flex: 2,
      // minWidth: 180,
      ...defaultGridColumnOptions,
      align: "right",
      valueGetter: (params) => formatRupiah(params.value as number),
    },
    {
      field: "createdAt",
      headerName: t("Created At"),
      flex: 2,
      // minWidth: 180,
      ...defaultGridColumnOptions,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
  ]

  const recentOrdersDataGridColumns: GridColumns = [
    {
      field: "customerName",
      headerName: t("Customer Name"),
      flex: 2,
      // minWidth: 160,
      ...defaultGridColumnOptions,
      valueGetter: (params) => {
        const order = params.row as Unpacked<
          Monorepo.Api.Response.DashboardResponseDto["recentOrders"]
        >
        return order?.customer?.name || "-"
      },
    },
    {
      field: "description",
      headerName: t("Description"),
      flex: 2,
      // minWidth: 160,
      ...defaultGridColumnOptions,
      valueGetter: (params) => params.value || "-",
    },
    {
      field: "total",
      headerName: t("Total"),
      flex: 2,
      // minWidth: 180,
      ...defaultGridColumnOptions,
      align: "right",
      valueGetter: (params) => formatRupiah(params.value as number),
    },
    {
      field: "createdAt",
      headerName: t("Created At"),
      flex: 2,
      // minWidth: 180,
      ...defaultGridColumnOptions,
      valueGetter: (params) => formatISOToLocale(params.value as string),
    },
  ]

  return (
    <Grid container className={classes.root} spacing={2} wrap="wrap">
      <Grid item xs={12}>
        <Typography style={{ marginBottom: theme.spacing(1) }} variant="h2">
          {t("Hello!", { ns: "message", name: user?.name })}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          style={{ marginBottom: theme.spacing(1), fontWeight: 500 }}
          variant="h5"
        >
          {t("Welcome to POS", { ns: "message" })}
        </Typography>
      </Grid>

      <Grid item container xs={12} justifyContent="center" spacing={2}>
        <Grid item xs={12} md={3}>
          <Card className={classes.card} color={theme.palette.primary.main}>
            <CardContent className={classes.cardContent}>
              <Box className={classes.cardHeader}>
                <Icon>
                  <AttachMoney />
                </Icon>
                <Typography
                  style={{ margin: theme.spacing(1), marginLeft: 0 }}
                  align="center"
                  variant="h3"
                >
                  {t("Total Sales")}
                </Typography>
              </Box>
              <Typography
                style={{
                  margin: theme.spacing(1),
                  marginLeft: 0,
                  fontWeight: 600,
                }}
                variant="h2"
              >
                {formatRupiah(totalSales)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box className={classes.cardHeader}>
                <Icon>
                  <MoneyOff />
                </Icon>
                <Typography
                  style={{ margin: theme.spacing(1), marginLeft: 0 }}
                  align="center"
                  variant="h3"
                >
                  {t("Total Expenses")}
                </Typography>
              </Box>
              <Typography
                style={{
                  margin: theme.spacing(1),
                  marginLeft: 0,
                  fontWeight: 600,
                }}
                variant="h2"
              >
                {formatRupiah(totalExpenses)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box className={classes.cardHeader}>
                <Icon>
                  <MonetizationOn />
                </Icon>
                <Typography
                  style={{ margin: theme.spacing(1), marginLeft: 0 }}
                  align="center"
                  variant="h3"
                >
                  {t("Total Profit")}
                </Typography>
              </Box>
              <Typography
                style={{
                  margin: theme.spacing(1),
                  marginLeft: 0,
                  fontWeight: 600,
                }}
                variant="h2"
              >
                {formatRupiah(
                  totalSales &&
                    typeof totalSales === "number" &&
                    totalExpenses &&
                    typeof totalExpenses === "number"
                    ? totalSales - totalExpenses
                    : 0,
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box className={classes.cardHeader}>
                <Icon>
                  <People />
                </Icon>
                <Typography
                  style={{ margin: theme.spacing(1), marginLeft: 0 }}
                  align="center"
                  variant="h3"
                >
                  {t("Total Customers")}
                </Typography>
              </Box>
              <Typography
                style={{
                  margin: theme.spacing(1),
                  marginLeft: 0,
                  fontWeight: 600,
                }}
                variant="h2"
              >
                {totalCustomers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography
          variant="h5"
          align="center"
          style={{ marginBottom: theme.spacing(1) }}
        >
          5 {t("Top Customers")}
        </Typography>
        <DataGrid
          className={classes.datagrid}
          columns={topCustomersDataGridColumns}
          rows={topCustomers}
          loading={isFetching}
          disableSelectionOnClick
          disableDensitySelector
          pageSize={5}
          hideFooter
          density="compact"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography
          variant="h5"
          align="center"
          style={{ marginBottom: theme.spacing(1) }}
        >
          5 {t("Recent Orders")}
        </Typography>
        <DataGrid
          className={classes.datagrid}
          columns={recentOrdersDataGridColumns}
          rows={recentOrders}
          loading={isFetching}
          disableSelectionOnClick
          disableDensitySelector
          pageSize={5}
          hideFooter
          density="compact"
        />
      </Grid>
    </Grid>
  )
}

export default HomeInfo
