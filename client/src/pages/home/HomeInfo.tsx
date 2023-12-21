import { useAppSelector } from "@/app/hooks"
import { selectCurrentUser } from "@/features/auth"
import { useConfirmationDialog } from "@/features/dialog"
import { useGetDashboardInfoQuery } from "@/services/api"
import { logger } from "@/services/logger"
import { formatRupiah } from "@/utils"
import { Box, Card, CardContent, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { t } from "i18next"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

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
  cardTypography: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const HomeInfo: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const user = useAppSelector(selectCurrentUser)

  const { data, isError } = useGetDashboardInfoQuery(null, {
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
    topCustomers,
    recentOrders,
  } = data?.data || {}

  return (
    <Box className={classes.root}>
      <Typography variant="h1" style={{ marginBottom: ".5em" }}>
        {t("Hello!", { ns: "message", name: user?.name })}
      </Typography>

      <Typography variant="h4" style={{ marginBottom: "1em" }}>
        {t("Welcome to POS", { ns: "message" })}
      </Typography>

      <Box className={classes.cardInfoContainer}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardTypography} variant="h3">
              {t("Total Sales")}
            </Typography>
            <Typography className={classes.cardTypography} variant="h4">
              {formatRupiah(totalSales)}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardTypography} variant="h3">
              {t("Total Expenses")}
            </Typography>
            <Typography className={classes.cardTypography} variant="h4">
              {formatRupiah(totalExpenses)}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardTypography} variant="h3">
              {t("Total Customers")}
            </Typography>
            <Typography className={classes.cardTypography} variant="h4">
              {totalCustomers}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* <Table></Table> */}
      {/* {JSON.stringify(data, null, 2)} */}
    </Box>
  )
}

export default HomeInfo
