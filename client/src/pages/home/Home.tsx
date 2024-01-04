import React from "react"
import { Outlet, useLocation } from "react-router-dom"

import MainContainer from "./MainContainer"
import Header from "./header/Header"
import Sidebar from "./sidebar/Sidebar"
import { Box, Grid } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    // zIndex: 1,
    // overflow: "auto",
    display: "flex",
    height: "calc(100vh - 1px)", // TODO: a hack
    borderBottom: "1px solid #e0e0e0",
  },
  logo: {
    height: "64px",
    background: theme.palette.primary.main,
  },
  logoContainer: {
    padding: "1em .5em",
    display: "flex",
    color: "white",
    "&:only-child > span": {
      padding: "4px 0px 0px 10px",
      fontWeight: "lighter",
    },
  },
}))

const Home: React.FC = () => {
  const classes = useStyles()
  const location = useLocation()

  const shouldRenderMobileMenu = location.pathname === "/sale"

  return (
    <Box className={classes.root}>
      <Header shouldRenderMobileMenu={shouldRenderMobileMenu} />
      <Sidebar />
      <MainContainer shouldRenderMobileMenu={shouldRenderMobileMenu}>
        <Outlet />
      </MainContainer>
    </Box>
  )
}

export default Home
