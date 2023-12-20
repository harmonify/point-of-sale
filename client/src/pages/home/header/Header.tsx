import { useAppDispatch } from "@/app/hooks"
import { toggleMobileDrawer } from "@/features/app"
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import MenuIcon from "@material-ui/icons/Menu"
import classNames from "classnames"
import { t } from "i18next"
import React from "react"

import Menus from "./HeaderMenu"

const drawerWidth = 200

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appBarFullWidth: {
    width: "100%",
  },
  flex: {
    flex: 1,
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navIconShow: {
    display: "block",
  },
  logo: {
    background: "#3f51b5",
  },
  logoContainer: {
    color: "white",
    "&:only-child > span": {
      padding: "4px 0px 0px 10px",
      fontWeight: "lighter",
    },
  },
}))

const Header: React.FC<{
  shouldRenderMobileMenu: boolean
}> = ({ shouldRenderMobileMenu }) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()

  const navIconClass =
    shouldRenderMobileMenu === true ? classes.navIconShow : classes.navIconHide

  const appBarClass =
    shouldRenderMobileMenu === true ? classes.appBarFullWidth : classes.appBar

  return (
    <AppBar className={appBarClass}>
      <Toolbar>
        {/* Collapse button. Clicking this opens the drawer */}
        <div className={classNames(classes.logo, navIconClass)}>
          <div className={classes.logoContainer}>
            <IconButton
              style={{ margin: 0 }}
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(toggleMobileDrawer())}
            >
              <MenuIcon />
            </IconButton>
            <span>{t("Point Of Sale")}</span>
          </div>
        </div>
        {/* This is the right side menu - Logout, My Profile */}
        <div className={classes.flex}>
          <Menus />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
