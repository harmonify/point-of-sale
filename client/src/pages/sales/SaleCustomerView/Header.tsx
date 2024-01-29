import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import { viewTheme } from "./SaleCustomerView"
import { APP } from "@/constants"
import { formatDateTimeToLocale } from "@/utils/string"
import { DateTime } from "luxon"
import { PointOfSale, ShoppingCart } from "@mui/icons-material"
import React from "react"
import { t } from "i18next"

export const Header: React.FC = () => {
  const theme = useTheme()
  const isMobileDevice = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Grid
      container
      sx={{
        paddingY: 2,
        paddingX: 3,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
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
        xs={12}
        md={4}
      >
        <PointOfSale
          sx={{ color: theme.palette.primary.contrastText, marginRight: 1 }}
        />
        <Typography variant="h1" align="center" color="inherit">
          {APP.name}
        </Typography>
      </Grid>

      <Grid
        item
        display={"flex"}
        justifyContent={"stretch"}
        alignItems={"center"}
        alignContent={"center"}
        hidden={isMobileDevice}
        md={4}
      >
        <Typography variant="h5" textTransform={"uppercase"} align="center" color="inherit">
          {t("Thank you for shopping at here", {
            ns: "message",
            storeName: APP.name,
          })}
        </Typography>
      </Grid>

      <Grid
        item
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
        hidden={isMobileDevice}
        md={4}
      >
        <Typography variant="h5" align="right" fontWeight={500} color="inherit">
          {DateTime.now()
            .setLocale(APP.defaultLang)
            .toFormat("dd MMMM yyyy HH:MM")}
        </Typography>
      </Grid>
    </Grid>
  )
}
