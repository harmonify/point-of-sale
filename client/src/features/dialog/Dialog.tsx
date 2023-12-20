import {
  DialogTitle,
  Divider,
  Slide,
  SlideProps,
  Typography,
} from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import MuiDialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import CloseIcon from "@material-ui/icons/Close"
import React, { MouseEventHandler, ReactElement } from "react"

const useStyles = makeStyles({
  appBar: {
    position: "relative",
  },
  title: {
    flex: 1,
    paddingLeft: "5px",
    fontWeight: 100,
    fontSize: "20px",
  },
  subTitle: {
    paddingLeft: "10px",
    fontWeight: 100,
    fontSize: "16px",
  },
})

const Transition = (props: SlideProps) => <Slide direction="up" {...props} />

const Dialog: React.FC<{
  open: boolean
  onClose: MouseEventHandler
  children: ReactElement
  title: string
}> = ({ open, onClose, children, title }) => {
  const classes = useStyles()

  return (
    <MuiDialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Typography
          variant="h5"
          color="inherit"
          className={classes.title}
          gutterBottom
        >
          {title}
        </Typography>
        <Divider />
      </DialogTitle>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {children}
    </MuiDialog>
  )
}

export default Dialog
