import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListSubheader,
  Typography,
  makeStyles,
} from "@material-ui/core"
import {
  Assessment,
  CalendarToday,
  Category,
  DateRange,
  GroupAdd,
  HourglassFull,
  LocalAtm,
  LocalMall,
  LocalShipping,
  More,
  NoteAdd,
  ShoppingCart,
  SupervisorAccount,
  Today,
  ViewModule,
} from "@material-ui/icons"
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
    color: "white",
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
        <Button onClick={() => navigate("/")} className={classes.logoContainer}>
          <ShoppingCart />
          <Typography color="inherit" variant="h5">
            {t("Point of Sales")}
          </Typography>
        </Button>
      </Grid>

      <List>
        <MenuItem
          isSelected={isSelected("sale")}
          onClick={() => navigate("/sale")}
          text={t("Sale")}
          icon={<ViewModule />}
        />

        <ListSubheader>
          <Typography variant="button">{t("Features")}</Typography>
        </ListSubheader>

        <MenuItem
          isSelected={isSelected("customers")}
          onClick={() => navigate("/customers")}
          text={t("Customers")}
          icon={<GroupAdd />}
        />

        <MenuItem
          isSelected={isSelected("suppliers")}
          onClick={() => navigate("/suppliers")}
          text={t("Suppliers")}
          icon={<SupervisorAccount />}
        />

        <MenuItem
          isSelected={isSelected("categories")}
          onClick={() => navigate("/categories")}
          text={t("Categories")}
          icon={<Category />}
        />

        <MenuItem
          isSelected={isSelected("units")}
          onClick={() => navigate("/units")}
          text={t("Units")}
          icon={<HourglassFull />}
        />

        <MenuItem
          isSelected={isSelected("products")}
          onClick={() => navigate("/products")}
          text={t("Products")}
          icon={<LocalMall />}
        />

        <MenuItem
          isSelected={isSelected("procurements")}
          onClick={() => navigate("/procurements")}
          text={t("Procurements")}
          icon={<LocalShipping />}
        />

        <ListSubheader>
          <Typography variant="button">{t("Reports")}</Typography>
        </ListSubheader>

        <MenuItem
          isSelected={isSelected("reports/sales/daily")}
          onClick={() => navigate("/reports/sales/daily")}
          text={t("Daily Sales")}
          icon={<Today />}
        />

        <MenuItem
          isSelected={isSelected("reports/sales/monthly")}
          onClick={() => navigate("/reports/sales/monthly")}
          text={t("Monthly Sales")}
          icon={<DateRange />}
        />

        <MenuItem
          isSelected={isSelected("reports/sales/yearly")}
          onClick={() => navigate("/reports/sales/yearly")}
          text={t("Yearly Sales")}
          icon={<CalendarToday />}
        />

        <MenuItem
          isSelected={isSelected("reports/profit-loss")}
          onClick={() => navigate("/reports/profit-loss")}
          text={t("Profit Loss")}
          icon={<LocalAtm />}
        />
      </List>
    </>
  )
}

export default Menu
