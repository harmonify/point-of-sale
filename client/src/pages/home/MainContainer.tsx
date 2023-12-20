import { makeStyles } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import classNames from "classnames"
import React, { Component, ReactElement, ReactNode } from "react"

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    padding: "70px 10px 15px 10px",
  },
  paper: {
    [theme.breakpoints.up("xs")]: {
      width: "calc(100vw - 20px)",
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100vw)",
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%",
    },
    height: `calc(100vh - 80px)`,
    overflowX: "auto",
    overflowY: "auto",
    borderRadius: "0px",
  },
  fullWidthContainer: {
    width: "100%",
  },
}))

const MainContainer: React.FC<{
  children: ReactNode
  shouldRenderMobileMenu: boolean
}> = (props) => {
  const classes = useStyles()
  const containerClass =
    props.shouldRenderMobileMenu === true
      ? classNames(classes.paper, classes.fullWidthContainer)
      : classes.paper

  return (
    <main className={classes.container}>
      <Paper className={containerClass} elevation={4}>
        {props.children}
      </Paper>
    </main>
  )
}

export default MainContainer
