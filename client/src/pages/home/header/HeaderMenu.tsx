import { useAppSelector } from "@/app/hooks"
import { selectAuthCredentials } from "@/features/auth"
import { usePostLogoutMutation } from "@/services/api"
import { logger } from "@/services/logger"
import { Menu, MenuItem } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import AccountCircle from "@material-ui/icons/AccountCircle"
import { t } from "i18next"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line
const useStyles = makeStyles((theme) => ({
  menuLeft: {
    float: "right",
  },
  menuItem: {
    fontSize: "13.5px",
    padding: "5px 20px 5px 20px",
  },
}))

const HeaderMenu: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [postLogout] = usePostLogoutMutation()

  const [anchorElement, setAnchorElement] = useState<
    (EventTarget & Element) | null
  >(null)
  const open = Boolean(anchorElement)

  const auth = useAppSelector(selectAuthCredentials)

  const handleOpen: React.MouseEventHandler = (event) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  const handleLogout = async () => {
    try {
      const response = await postLogout({ refreshToken: auth.refreshToken! })
    } finally {
      return navigate("/login")
    }
  }

  const handleOnClickProfile = () => {
    navigate("/profile")
  }

  return (
    <>
      {/* This is right corner menu [logout, my profile] */}
      <IconButton
        className={classes.menuLeft}
        aria-owns={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem className={classes.menuItem} onClick={handleOnClickProfile}>
          {t("Profile")}
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleLogout}>
          {t("Logout")}
        </MenuItem>
      </Menu>
    </>
  )
}

export default HeaderMenu
