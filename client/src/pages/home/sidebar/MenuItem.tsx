import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import React, { Component } from "react"

const useStyles = makeStyles((theme) => ({
  listItem: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "& $icon": {
        color: theme.palette.common.white,
      },
    },
  },
  icon: {
    width: 20,
  },
  selected: {
    backgroundColor: "#00000014",
    borderColor: theme.palette.primary.main,
    borderLeft: "5px solid",
    paddingLeft: 20,
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
    if (isSelected) return classNames(classes.listItem, classes.selected)
    return classNames(classes.listItem)
  }
  return (
    <ListItem button dense onClick={props.onClick} className={getClassName()}>
      <ListItemIcon className={classes.icon}>{props.icon}</ListItemIcon>
      <ListItemText
        style={{ padding: 2 }}
        primary={
          <Typography style={{ fontSize: 14 }} color="inherit" variant="button">
            {props.text}
          </Typography>
        }
      />
    </ListItem>
  )
}

export default MenuItem
