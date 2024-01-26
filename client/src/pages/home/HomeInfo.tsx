import { useAppSelector } from "@/app/hooks"
import { APP_ENV } from "@/environment"
import { APP } from "@/constants"
import { selectCurrentUser } from "@/features/auth"
import { useGetDashboardInfoQuery } from "@/services/api"
import { formatISOToLocale, formatRupiah } from "@/utils"
import { Box, Card, CardContent, Grid, Icon, Typography } from "@mui/material"
import { makeStyles, useTheme } from "@mui/styles"
import {
  AttachMoney,
  LocalShipping,
  MonetizationOn,
  MoneyOff,
  People,
  Receipt,
} from "@mui/icons-material"
import { DataGrid, GridColDef, GridColumns } from "@mui/x-data-grid"
import { t } from "i18next"
import React, { useEffect } from "react"
import {
  recentOrdersDataGridColumns,
  topCustomersDataGridColumns,
} from "./dataGridColumns"
import { isNumber } from "@/utils/number"

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
    totalOrders,
    recentOrders = [],
  } = data?.data || {}

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
          {t("Welcome to POS", { ns: "message", title: APP.name })}
        </Typography>
      </Grid>

      <Grid item container xs={12} justifyContent="center" spacing={2}>
        <Grid item xs={12} md={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box className={classes.cardHeader}>
                <Icon>
                  <Receipt />
                </Icon>
                <Typography
                  style={{ margin: theme.spacing(1), marginLeft: 0 }}
                  align="center"
                  variant="h3"
                >
                  {t("Total Orders")}
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
                {totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

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
                  <LocalShipping />
                </Icon>
                <Typography
                  style={{ margin: theme.spacing(1), marginLeft: 0 }}
                  align="center"
                  variant="h4"
                >
                  {t("Procurement Total Cost")}
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

        {/* <Grid item xs={12} md={2}>
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
                  isNumber(totalSales) && isNumber(totalExpenses)
                    ? totalSales - totalExpenses
                    : 0,
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}

        {/* <Grid item xs={12} md={2}>
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
        </Grid> */}
      </Grid>

      {/* <Grid item xs={12} md={6}>
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
      </Grid> */}

      <Grid item xs={12}>
        <Typography
          variant="h5"
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
        />
      </Grid>
    </Grid>
  )
}

export default HomeInfo
