import { makeStyles } from "@mui/styles"
import React, { Component, ReactElement, ReactNode } from "react"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexGrow: 1,
    paddingTop: "72px",
    paddingBottom: "16px",
    overflowX: "auto",
    overflowY: "auto",
  },
}))

const MainContainer: React.FC<{
  children: ReactNode
  shouldRenderMobileMenu: boolean
}> = (props) => {
  const classes = useStyles()
  return <main className={classes.container}>{props.children}</main>
}

export default MainContainer
