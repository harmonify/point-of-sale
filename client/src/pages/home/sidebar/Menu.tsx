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
  Category,
  GroupAdd,
  HourglassFull,
  LocalAtm,
  LocalMall,
  LocalShipping,
  More,
  NoteAdd,
  ShoppingCart,
  SupervisorAccount,
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
        <MenuItem text={t("Today Sales")} icon={<Assessment />} />
        <MenuItem text={t("Expense")} icon={<LocalAtm />} />
      </List>
    </>
  )
}

export default Menu
