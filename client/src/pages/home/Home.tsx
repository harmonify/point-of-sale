import React from "react"
import { Outlet, useLocation } from "react-router-dom"

import MainContainer from "./MainContainer"
import Header from "./header/Header"
import Sidebar from "./sidebar/Sidebar"
import useHomeStyles from "./styles"

// eslint-disable-next-line

const Home: React.FC = () => {
  const classes = useHomeStyles()
  const location = useLocation()

  const shouldRenderMobileMenu = location.pathname === "/sale"

  return (
    <div className={classes.root}>
      <Header shouldRenderMobileMenu={shouldRenderMobileMenu} />
      <Sidebar />
      <MainContainer shouldRenderMobileMenu={shouldRenderMobileMenu}>
        <Outlet />
      </MainContainer>
    </div>
  )
}

export default Home
