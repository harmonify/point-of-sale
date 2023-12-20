import { useAppSelector } from "@/app/hooks"
import { selectCurrentUser } from "@/features/auth"
import { useGetDashboardInfoQuery } from "@/services/api"
import { formatRupiah } from "@/utils"
import { Box, Card, CardContent, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { t } from "i18next"
import React from "react"

// eslint-disable-next-line
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: "16px",
  },
  cardInfoContainer: {
    display: "flex",
    flexGrow: 1,
    "& > *": {
      margin: "16px",
      marginLeft: 0,
      padding: theme.spacing(1),
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
}))

const HomeInfo: React.FC = () => {
  const classes = useStyles()
  const user = useAppSelector(selectCurrentUser)

  const { data } = useGetDashboardInfoQuery(null, {
    // pollingInterval: 15000,
    refetchOnMountOrArgChange: true,
  })

  const {
    totalSales,
    totalExpenses,
    totalCustomers,
    topCustomers,
    recentOrders,
  } = data?.data || {}

  return (
    <Box className={classes.root}>
      <Typography variant="h1">
        {t("Welcome to POS, {name}", { name: user?.name })}
      </Typography>

      <Box className={classes.cardInfoContainer}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6">{t("Total Sales")}</Typography>
            <Typography variant="h6">{formatRupiah(totalSales)}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6">{t("Total Expenses")}</Typography>
            <Typography variant="h6">{formatRupiah(totalExpenses)}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6">{t("Total Customers")}</Typography>
            <Typography variant="h6">{totalCustomers}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* <Table></Table> */}
      {/* {JSON.stringify(data, null, 2)} */}
    </Box>
  )
}

export default HomeInfo
