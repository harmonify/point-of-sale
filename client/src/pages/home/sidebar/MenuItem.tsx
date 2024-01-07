import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import classNames from "classnames"
import React, { Component } from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    ".MuiListItemIcon-root": {
      color: theme.palette.common.white,
      "&:hover": {
        color: theme.palette.common.white,
      },
    },
  },
  selected: {
    backgroundColor: "#00000014",
    borderColor: theme.palette.primary.main,
    borderLeft: "5px solid",
    paddingLeft: theme.spacing(1),
  },
}))

const MenuItem: React.FC<{
  isSelected?: boolean
  onClick?: React.MouseEventHandler
  text: string
  icon: React.ReactElement
  classes?: any
}> = (props) => {
  const classes = useStyles()
  const { isSelected = false } = props

  const getClassName = () => {
    if (isSelected) return classNames(classes.root, classes.selected)
    return classNames(classes.root)
  }
  return (
    <ListItemButton dense onClick={props.onClick} className={getClassName()}>
      <ListItemIcon color="inherit">{props.icon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography color="inherit" variant="button">
            {props.text}
          </Typography>
        }
      />
    </ListItemButton>
  )
}

export default MenuItem
