import {
  CalendarToday,
  Category,
  DateRange,
  GroupAdd,
  HourglassFull,
  LocalAtm,
  LocalMall,
  LocalShipping,
  ShoppingCart,
  SupervisorAccount,
  Today,
  ViewModule,
} from "@mui/icons-material"
import { Button, Grid, List, ListSubheader, Typography } from "@mui/material"
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
  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()

  const isSelected = (path: string) =>
    location.pathname === `/${path}` || location.pathname.includes(`/${path}/`)

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        alignContent="center"
        className={classes.logo}
      >
        <Button onClick={() => navigate("/")} className={classes.logoContainer} variant="text">
          <ShoppingCart />
          <Typography color="inherit">
            {t("Point of Sales")}
          </Typography>
        </Button>
      </Grid>

      <List>
        <MenuItem
          isSelected={isSelected("sale")}
          onClick={() => navigate("/sale")}
          text={t("Sale")}
          icon={<ViewModule color="inherit"/>}
        />

        <ListSubheader>
          <Typography variant="button">{t("Features")}</Typography>
        </ListSubheader>

        <MenuItem
          isSelected={isSelected("customers")}
          onClick={() => navigate("/customers")}
          text={t("Customers")}
          icon={<GroupAdd color="inherit"/>}
        />

        <MenuItem
          isSelected={isSelected("suppliers")}
          onClick={() => navigate("/suppliers")}
          text={t("Suppliers")}
          icon={<SupervisorAccount color="inherit"/>}
        />

        <MenuItem
          isSelected={isSelected("categories")}
          onClick={() => navigate("/categories")}
          text={t("Categories")}
          icon={<Category color="inherit"/>}
        />

        <MenuItem
          isSelected={isSelected("units")}
          onClick={() => navigate("/units")}
          text={t("Units")}
          icon={<HourglassFull color="inherit"/>}
        />

        <MenuItem
          isSelected={isSelected("products")}
          onClick={() => navigate("/products")}
          text={t("Products")}
          icon={<LocalMall color="inherit"/>}
        />

        <MenuItem
          isSelected={isSelected("procurements")}
          onClick={() => navigate("/procurements")}
          text={t("Procurements")}
          icon={<LocalShipping color="inherit"/>}
        />

        <ListSubheader>
          <Typography variant="button">{t("Reports")}</Typography>
        </ListSubheader>

        <MenuItem
          isSelected={isSelected("reports/sales/daily")}
          onClick={() => navigate("/reports/sales/daily")}
          text={t("Daily Sales")}
          icon={<Today color="inherit"/>}
        />

        <MenuItem
          isSelected={isSelected("reports/sales/monthly")}
          onClick={() => navigate("/reports/sales/monthly")}
          text={t("Monthly Sales")}
          icon={<DateRange color="inherit"/>}
        />

        <MenuItem
          isSelected={isSelected("reports/sales/yearly")}
          onClick={() => navigate("/reports/sales/yearly")}
          text={t("Yearly Sales")}
          icon={<CalendarToday color="inherit"/>}
        />

        <MenuItem
          isSelected={isSelected("reports/profit-loss")}
          onClick={() => navigate("/reports/profit-loss")}
          text={t("Profit Loss")}
          icon={<LocalAtm color="inherit"/>}
        />
      </List>
    </>
  )
}

export default Menu
