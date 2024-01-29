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
  Stack,
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
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Body } from "./Body"

const lightTheme = {
  color: "black",
  backgroundColor: "white",
}
const darkTheme = {
  color: "white",
  backgroundColor: softBlack,
}
export const viewTheme = lightTheme

const SaleCustomerView: React.FC = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const session = queryParameters.get("session")
  logger.debug(
    `🚀 ~ session ~ ${logger.conditionalStringify({
      obj: session,
      when: logger.isDebugEnabled,
    })}`,
  )

  const [cartState, setCartState] = useState<CartStateSummary>()
  logger.debug(
    `🚀 ~ cartState ~ ${logger.conditionalStringify({
      obj: cartState,
      when: logger.isDebugEnabled,
    })}`,
  )

  const { isConnected } = useSocketIO([
    {
      event: `cart-update-${session}`,
      listener(args: any) {
        logger.debug(
          `🚀 ~ new updated cartState ~ ${logger.conditionalStringify({
            obj: args,
            when: logger.isDebugEnabled,
          })}`,
        )
        setCartState(args)
      },
    },
  ])
  logger.debug(`🚀 ~ isConnected ~ ${isConnected}}`)

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 1px)">
      <Header />

      <Body cartState={cartState} />

      <Footer
        totalQty={Object.values(cartState?.items || {}).reduce(
          (acc, sp) => acc + sp.quantity,
          0,
        )}
        discountTotal={cartState ? cartState.discountTotal : 0}
        total={cartState ? cartState.total : 0}
        paid={cartState ? cartState.paid : 0}
        change={cartState ? cartState.change : 0}
      />
    </Box>
  )
}

export default SaleCustomerView
