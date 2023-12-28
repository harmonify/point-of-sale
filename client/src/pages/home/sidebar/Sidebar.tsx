import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  selectShouldOpenMobileDrawer,
  toggleMobileDrawer,
} from "@/features/app"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import React from "react"

import Menu from "./Menu"
import { useLocation } from "react-router-dom"

const drawerWidth = 200

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
    height: "calc(100vh - 1px)",
    borderBottom: "1px solid #e0e0e0",
  },
  drawerPaper2: {
    width: drawerWidth,
    height: "calc(100vh - 1px)",
    // borderBottom: "1px solid #e0e0e0",
  },
}))

const Sidebar: React.FC = () => {
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const location = useLocation()

  const openMobileDrawer = useAppSelector(selectShouldOpenMobileDrawer)
  const isSale = location.pathname === "/sale"

  const handleDrawerToggle = () => dispatch(toggleMobileDrawer())

  return (
    <>
      {/* MEDIUM SCREENS */}
      {/* @ts-ignore - 3rd party library fault */}
      <Hidden mdUp={true}>
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={openMobileDrawer}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Menu />
        </Drawer>
      </Hidden>

      {/* For sale */}
      {isSale && (
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={openMobileDrawer}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper2,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Menu />
        </Drawer>
      )}

      {/* Default - LARGER SCREENS */}
      {/* @ts-ignore - 3rd party library fault */}
      <Hidden smDown implementation="css">
        {!isSale && (
          <Drawer
            variant="permanent"
            open={false}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Menu />
          </Drawer>
        )}
      </Hidden>
    </>
  )
}

export default Sidebar
