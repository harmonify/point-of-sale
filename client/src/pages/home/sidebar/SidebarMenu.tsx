import { useAppSelector } from "@/app/hooks"
import { selectDarkMode } from "@/features/app"
import {
  CalendarMonth,
  CalendarToday,
  Category,
  CorporateFare,
  DateRange,
  FormatListBulleted,
  Group,
  HourglassFull,
  LocalAtm,
  LocalMall,
  LocalShipping,
  PointOfSale,
  ShoppingCart,
  Today,
} from "@mui/icons-material"
import {
  Button,
  Grid,
  List,
  ListSubheader,
  Typography,
  useTheme,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { t } from "i18next"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import MenuItem from "./MenuItem"
import { APP } from "@/constants"

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "64px",
    padding: "1em .5em",
    background: theme.palette.primary.main,
  },
  logoContainer: {
    padding: "1em .5em",
    display: "flex",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}))

const SidebarMenu: React.FC = () => {
  const darkMode = useAppSelector(selectDarkMode)

  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  const isSelected = (path: string, exactMatch: boolean = false) => {
    return (
      location.pathname === path ||
      (exactMatch ? false : location.pathname.includes(`${path}/`))
    )
  }

  const iconColor = darkMode
    ? theme.palette.primary.contrastText
    : theme.palette.grey["700"]

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        alignContent="center"
        className={classes.logo}
      >
        <Button
          onClick={() => navigate("/")}
          size="large"
          className={classes.logoContainer}
          variant="text"
          startIcon={
            <ShoppingCart
              style={{ color: theme.palette.primary.contrastText }}
            />
          }
        >
          <Typography variant="h5" color={theme.palette.primary.contrastText}>
            {APP.name}
          </Typography>
        </Button>
      </Grid>

      <ListSubheader>
        <Typography variant="button">POS</Typography>
      </ListSubheader>

      <List>
        <MenuItem
          isSelected={isSelected("/sales", true)}
          onClick={() => navigate("/sales")}
          text={t("Sale")}
          icon={<PointOfSale style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("/sales/list")}
          onClick={() => navigate("/sales/list")}
          text={t("Order")}
          icon={<FormatListBulleted style={{ color: iconColor }} />}
        />

        <ListSubheader>
          <Typography variant="button">{t("Data")}</Typography>
        </ListSubheader>

        {/* <MenuItem
          isSelected={isSelected("/customers")}
          onClick={() => navigate("/customers")}
          text={t("Customers")}
          icon={<Group style={{ color: iconColor }} />}
        /> */}

        <MenuItem
          isSelected={isSelected("/suppliers")}
          onClick={() => navigate("/suppliers")}
          text={t("Suppliers")}
          icon={<CorporateFare style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("/categories")}
          onClick={() => navigate("/categories")}
          text={t("Categories")}
          icon={<Category style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("/units")}
          onClick={() => navigate("/units")}
          text={t("Units")}
          icon={<HourglassFull style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("/products")}
          onClick={() => navigate("/products")}
          text={t("Products")}
          icon={<LocalMall style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("/procurements")}
          onClick={() => navigate("/procurements")}
          text={t("Procurements")}
          icon={<LocalShipping style={{ color: iconColor }} />}
        />

        <ListSubheader>
          <Typography variant="button">{t("Reports")}</Typography>
        </ListSubheader>

        <MenuItem
          isSelected={isSelected("/reports/sales", true)}
          onClick={() => navigate("/reports/sales")}
          text={t("Sales")}
          icon={<DateRange style={{ color: iconColor }} />}
        />

        {/* <MenuItem
          isSelected={isSelected("/reports/sales/daily")}
          onClick={() => navigate("/reports/sales/daily")}
          text={t("Daily Sales")}
          icon={<Today style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("/reports/sales/monthly")}
          onClick={() => navigate("/reports/sales/monthly")}
          text={t("Monthly Sales")}
          icon={<CalendarMonth style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("/reports/sales/yearly")}
          onClick={() => navigate("/reports/sales/yearly")}
          text={t("Yearly Sales")}
          icon={<CalendarToday style={{ color: iconColor }} />}
        /> */}

        <MenuItem
          isSelected={isSelected("/reports/profit-loss")}
          onClick={() => navigate("/reports/profit-loss")}
          text={t("Profit Loss")}
          icon={<LocalAtm style={{ color: iconColor }} />}
        />
      </List>
    </>
  )
}

export default SidebarMenu
