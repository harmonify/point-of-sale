import { socket } from "@/app/socket"
import { APP } from "@/constants"
import { CartStateSummary } from "@/features/cart"
import { useSocketIO } from "@/hooks/useSocketIO"
import { logger } from "@/services/logger"
import { softBlack } from "@/theme/palette"
import { formatRupiah } from "@/utils"
import { isNumber } from "@/utils/number"
import { formatDateTimeToLocale } from "@/utils/string"
import {
  Box,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { makeStyles, useTheme } from "@mui/styles"
import { t } from "i18next"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"

const lightTheme = {
  color: 'black',
  backgroundColor: 'white'
}
const darkTheme = {
  color: 'white',
  backgroundColor: softBlack
}
const viewTheme = darkTheme


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: viewTheme.backgroundColor,
    color: viewTheme.color,
    width: "100%",
    height: "calc(100vh - 1px)", // TODO: a hack
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    "& .MuiTable-root": {
      border: `1px solid ${theme.palette.grey[500]}`,
    },
    "& .MuiTableCell-root": {
      border: `1px solid ${theme.palette.grey[500]}`,
      padding: theme.spacing(1),
    },
  },
}))

const SaleCustomerView: React.FC = () => {
  const theme = useTheme()
  const classes = useStyles()

  const queryParameters = new URLSearchParams(window.location.search)
  const session = queryParameters.get("session")
  logger.debug(`🚀 ~ session ~ ${JSON.stringify(session, null, 2)}`)

  const [cartState, setCartState] = useState<CartStateSummary>()
  logger.debug(`🚀 ~ cartState ~ ${JSON.stringify(cartState, null, 2)}`)

  const { isConnected } = useSocketIO([
    {
      event: `cart-update-${session}`,
      listener(args: any) {
        logger.debug(
          `🚀 ~ new updated cartState ~ ${JSON.stringify(args, null, 2)}`,
        )
        setCartState(args)
      },
    },
  ])
  logger.debug(`🚀 ~ isConnected ~ ${JSON.stringify(isConnected, null, 2)}`)

  return (
    <Box className={classes.root}>
      <Grid
        container
        display={"flex"}
        justifyContent={"stretch"}
        alignItems={"center"}
        alignContent={"center"}
      >
        <Grid
          item
          display={"flex"}
          justifyContent={"stretch"}
          alignItems={"center"}
          alignContent={"center"}
          xs={8}
        >
          <Typography
            color={viewTheme.color}
            variant="h1"
            align="center"
            marginRight={1}
          >
            {APP.name}
          </Typography>
          <Typography color={viewTheme.color} variant="h4" align="center">
            {isConnected ? "🟢" : "🔴"}
          </Typography>
        </Grid>

        <Grid
          item
          display={"flex"}
          justifyContent={"end"}
          alignItems={"center"}
          xs={4}
        >
          <Typography
            variant="h5"
            color={viewTheme.color}
            align="right"
            fontWeight={500}
          >
            {formatDateTimeToLocale(DateTime.now(), {
              second: undefined,
            })}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: theme.spacing(2) }} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color={viewTheme.color}>
                {t("Product")}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" color={viewTheme.color}>
                {t("Subtotal")}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cartState ? (
            Object.values(cartState.items || {}).map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: "65%" }}>
                  <Typography
                    color={viewTheme.color}
                    fontSize={theme.typography.body1.fontSize}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    fontSize={theme.typography.body2.fontSize}
                    color={viewTheme.color}
                  >
                    {item.quantity} {item.unitName} x{" "}
                    {formatRupiah(item.salePrice)}
                  </Typography>
                  {!isNumber(item.discount) || item.discount <= 0 ? null : (
                    <Typography
                      fontSize={theme.typography.body2.fontSize}
                      color={viewTheme.color}
                    >
                      {t("Discount")}: {formatRupiah(item.discount)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right" sx={{ width: "35%" }}>
                  <Typography color={viewTheme.color}>
                    {formatRupiah(item.total)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9999}
                style={{ padding: 20, textAlign: "center" }}
              >
                <Typography component="strong" color={viewTheme.color}>
                  {t("No items in the cart", { ns: "message" })}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color={viewTheme.color} align="right">
                {t("Total Qty")}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color={viewTheme.color}>
                {Object.values(cartState?.items || {}).reduce(
                  (acc, sp) => acc + sp.quantity,
                  0,
                )}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color={viewTheme.color} align="right">
                {t("Discount on Total")}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color={viewTheme.color}>
                {formatRupiah(cartState ? cartState.discountTotal : 0)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color={viewTheme.color} align="right">
                {t("Total")}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color={viewTheme.color} variant="h4">
                {formatRupiah(cartState ? cartState.total : 0)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color={viewTheme.color} align="right">
                {t("Cash")}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color={viewTheme.color} variant="h4">
                {formatRupiah(cartState ? cartState.paid : 0)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6" color={viewTheme.color} align="right">
                {t("Change")}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                color={viewTheme.color}
                variant="h4"
                style={{
                  color: !cartState 
                    ? theme.palette.info.main
                    : cartState.change === 0
                    ? theme.palette.info.main
                    : cartState.change > 0
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                }}
              >
                {formatRupiah(cartState ? cartState.change : 0)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  )
}

export default SaleCustomerView
