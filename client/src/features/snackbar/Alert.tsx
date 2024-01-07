import { colors, IconButton, Paper } from "@mui/material"
import { makeStyles } from "@mui/styles"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CloseIcon from "@mui/icons-material/CloseOutlined"
import ErrorIcon from "@mui/icons-material/ErrorOutlined"
import InfoIcon from "@mui/icons-material/InfoOutlined"
import WarningIcon from "@mui/icons-material/WarningOutlined"
import clsx from "clsx"
import React, { forwardRef } from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "6px 16px",
    borderRadius: 16,
  },
  default: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  success: {
    backgroundColor: colors.green[600],
    color: theme.palette.common.white,
  },
  info: {
    backgroundColor: colors.lightBlue[600],
    color: theme.palette.common.white,
  },
  warning: {
    backgroundColor: colors.orange[900],
    color: theme.palette.common.white,
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  message: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    fontWeight: 600,
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  action: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    paddingLeft: 16,
    marginRight: -8,
  },
}))

const icons = {
  default: <InfoIcon />,
  success: <CheckCircleIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
}

export type IAlertVariant = "default" | "info" | "success" | "warning" | "error"

const Alert = forwardRef<
  React.Component,
  {
    message: string
    variant?: IAlertVariant
    icon?: React.ReactElement
    className?: string
    onClose?: (event: Event | React.SyntheticEvent<any>) => void
  }
>((props, ref) => {
  const {
    className,
    icon,
    variant = "default",
    message,
    onClose,
    ...rest
  } = props
  const classes = useStyles()

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, classes[variant], className)}
      elevation={1}
      ref={ref}
      variant="elevation"
    >
      <span className={classes.icon}>{icon || icons[variant]}</span>
      <div className={classes.message}>{message}</div>
      {onClose && (
        <IconButton
          className={classes.action}
          color="inherit"
          key="close"
          onClick={onClose}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      )}
    </Paper>
  )
})

Alert.displayName = "Alert"

export default Alert
