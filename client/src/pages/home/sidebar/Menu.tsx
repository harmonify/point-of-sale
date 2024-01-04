import { useAppSelector } from "@/app/hooks"
import { selectDarkMode } from "@/features/app"
import {
  CalendarToday,
  Category,
  CorporateFare,
  DateRange,
  Group,
  HourglassFull,
  LocalAtm,
  LocalMall,
  LocalShipping,
  ShoppingCart,
  Today,
  ViewModule,
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

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "64px",
    background: theme.palette.primary.main,
  },
  logoContainer: {
    padding: "1em .5em",
    display: "flex",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}))

const Menu: React.FC = () => {
  const darkMode = useAppSelector(selectDarkMode)

  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  const isSelected = (path: string) =>
    location.pathname === `/${path}` || location.pathname.includes(`/${path}/`)

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
          startIcon={
            <ShoppingCart
              style={{ color: theme.palette.primary.contrastText }}
            />
          }
        >
          <Typography variant="h5" color={theme.palette.primary.contrastText}>
            {t("Point of Sales")}
          </Typography>
        </Button>
      </Grid>

      <List>
        <MenuItem
          isSelected={isSelected("sale")}
          onClick={() => navigate("/sale")}
          text={t("Sale")}
          icon={<ViewModule style={{ color: iconColor }} />}
        />

        <ListSubheader>
          <Typography variant="button">{t("Features")}</Typography>
        </ListSubheader>

        <MenuItem
          isSelected={isSelected("customers")}
          onClick={() => navigate("/customers")}
          text={t("Customers")}
          icon={<Group style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("suppliers")}
          onClick={() => navigate("/suppliers")}
          text={t("Suppliers")}
          icon={<CorporateFare style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("categories")}
          onClick={() => navigate("/categories")}
          text={t("Categories")}
          icon={<Category style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("units")}
          onClick={() => navigate("/units")}
          text={t("Units")}
          icon={<HourglassFull style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("products")}
          onClick={() => navigate("/products")}
          text={t("Products")}
          icon={<LocalMall style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("procurements")}
          onClick={() => navigate("/procurements")}
          text={t("Procurements")}
          icon={<LocalShipping style={{ color: iconColor }} />}
        />

        <ListSubheader>
          <Typography variant="button">{t("Reports")}</Typography>
        </ListSubheader>

        <MenuItem
          isSelected={isSelected("reports/sales")}
          onClick={() => navigate("/reports/sales")}
          text={t("Sales")}
          icon={<Today style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("reports/sales/daily")}
          onClick={() => navigate("/reports/sales/daily")}
          text={t("Daily Sales")}
          icon={<Today style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("reports/sales/monthly")}
          onClick={() => navigate("/reports/sales/monthly")}
          text={t("Monthly Sales")}
          icon={<DateRange style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("reports/sales/yearly")}
          onClick={() => navigate("/reports/sales/yearly")}
          text={t("Yearly Sales")}
          icon={<CalendarToday style={{ color: iconColor }} />}
        />

        <MenuItem
          isSelected={isSelected("reports/profit-loss")}
          onClick={() => navigate("/reports/profit-loss")}
          text={t("Profit Loss")}
          icon={<LocalAtm style={{ color: iconColor }} />}
        />
      </List>
    </>
  )
}

export default Menu
