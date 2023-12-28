import { useAppDispatch } from "@/app/hooks"
import { toggleDarkMode, toggleMobileDrawer } from "@/features/app"
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import MenuIcon from "@material-ui/icons/Menu"
import classNames from "classnames"
import { t } from "i18next"
import React from "react"

import Menus from "./HeaderMenu"
import { Brightness4, Brightness7 } from "@material-ui/icons"
import { Box } from "@material-ui/core"

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
  menuLeft: {
    float: "left",
  },
  menuRight: {
    float: "right",
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
    background: theme.palette.primary.main,
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
  const theme = useTheme()

  const navIconClass =
    shouldRenderMobileMenu === true ? classes.navIconShow : classes.navIconHide

  const appBarClass =
    shouldRenderMobileMenu === true ? classes.appBarFullWidth : classes.appBar

  return (
    <AppBar className={appBarClass}>
      <Toolbar>
        {/* Collapse button. Clicking this opens the drawer */}
        <Box className={classNames(classes.logo, navIconClass)}>
          <Box className={classes.logoContainer}>
            <IconButton
              style={{ margin: 0 }}
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(toggleMobileDrawer())}
            >
              <MenuIcon />
            </IconButton>
            <span>{t("Point of Sales")}</span>
          </Box>
        </Box>
        <Box className={classes.flex}>
          {/* This is the right side menu - Logout, My Profile */}
          <Box className={classes.menuRight}>
            <IconButton
              onClick={() => dispatch(toggleDarkMode())}
              color="inherit"
            >
              {theme.palette.type === "dark" ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
            <Menus />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
