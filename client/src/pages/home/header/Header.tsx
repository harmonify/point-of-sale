import { useAppDispatch } from "@/app/hooks"
import { toggleDarkMode, toggleMobileDrawer } from "@/features/app"
import { Brightness4, Brightness7, ShoppingCart } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import { Box, Button, Grid, Typography } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import { makeStyles, useTheme } from "@mui/styles"
import classNames from "classnames"
import { t } from "i18next"
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import HeaderMenu from "./HeaderMenu"
import { APP } from "@/constants"

const drawerWidth = 240

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
}))

const Header: React.FC<{
  shouldRenderMobileMenu: boolean
}> = ({ shouldRenderMobileMenu }) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const theme = useTheme()

  const navigate = useNavigate()

  const navIconClass =
    shouldRenderMobileMenu === true ? classes.navIconShow : classes.navIconHide

  const appBarClass =
    shouldRenderMobileMenu === true ? classes.appBarFullWidth : classes.appBar

  return (
    <AppBar
      style={{ backgroundColor: theme.palette.primary.main }}
      className={appBarClass}
    >
      <Toolbar>
        {/* Collapse button. Clicking this opens the drawer */}
        <Box className={classNames(classes.logo, navIconClass)}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ color: theme.palette.primary.contrastText }}
          >
            <Grid item>
              <IconButton
                style={{ margin: 0 }}
                color="inherit"
                aria-label="open drawer"
                onClick={() => dispatch(toggleMobileDrawer())}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item>
              <Button
                onClick={() => navigate("/")}
                size="large"
                startIcon={
                  <ShoppingCart
                    style={{ color: theme.palette.primary.contrastText }}
                  />
                }
              >
                <Typography
                  variant="h5"
                  color={theme.palette.primary.contrastText}
                >
                  {APP.name}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.flex}>
          {/* This is the right side menu - Logout, My Profile */}
          <Box className={classes.menuRight}>
            <IconButton
              onClick={() => dispatch(toggleDarkMode())}
              color="inherit"
              size="large"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>

            <HeaderMenu />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
