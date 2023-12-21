import {
  Box,
  Button,
  IconButton,
  List,
  ListSubheader,
  Typography,
} from "@material-ui/core"
import {
  Assessment,
  GroupAdd,
  LocalAtm,
  More,
  NoteAdd,
  ShoppingCart,
  SupervisorAccount,
  ViewModule,
} from "@material-ui/icons"
import { t } from "i18next"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import useHomeStyles from "../styles"
import MenuItem from "./MenuItem"

const Menu: React.FC = () => {
  const classes = useHomeStyles()
  const location = useLocation()
  const navigate = useNavigate()

  const isSelected = (path: string) =>
    location.pathname === `/${path}` || location.pathname.includes(`/${path}/`)

  return (
    <>
      <Box className={classes.logo}>
        <Button onClick={() => navigate("/")} className={classes.logoContainer}>
          <ShoppingCart />
          <Typography color="inherit" variant="button">
            {t("Point of Sales")}
          </Typography>
        </Button>
      </Box>

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
          isSelected={isSelected("products") || isSelected("producttypes")}
          onClick={() => navigate("/products")}
          text={t("Products")}
          icon={<More />}
        />

        <MenuItem
          isSelected={isSelected("expense") || isSelected("expensetypes")}
          onClick={() => navigate("/expense")}
          text={t("Expense")}
          icon={<LocalAtm />}
        />

        <MenuItem
          isSelected={isSelected("receivings")}
          onClick={() => navigate("/receivings")}
          text={t("Receivings")}
          icon={<NoteAdd />}
        />

        <ListSubheader>
          <Typography variant="button">{t("Reports")}</Typography>
        </ListSubheader>
        <MenuItem text={t("Todays Sales")} icon={<Assessment />} />
        <MenuItem text={t("Expense")} icon={<LocalAtm />} />
      </List>
    </>
  )
}

export default Menu
