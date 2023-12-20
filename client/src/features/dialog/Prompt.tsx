import React, { MouseEventHandler } from "react"
import Button from "@material-ui/core/Button"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"

const Prompt: React.FC<{
  open: boolean
  handleClose: MouseEventHandler
  message: string
}> = (props) => (
  <Dialog
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Message</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {props.message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose} color="primary" autoFocus>
        Ok
      </Button>
    </DialogActions>
  </Dialog>
)

export default Prompt
