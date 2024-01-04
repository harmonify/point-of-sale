import React, { MouseEventHandler } from "react"
import Button from "@mui/material/Button"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"

const YesNo: React.FC<{
  open: boolean
  message: string
  onCancel: MouseEventHandler
  onOk: MouseEventHandler
}> = (props) => (
  <Dialog
    open={props.open}
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
      <Button onClick={props.onCancel} color="primary" autoFocus>
        Cancel
      </Button>
      <Button onClick={props.onOk} color="secondary" autoFocus>
        Ok
      </Button>
    </DialogActions>
  </Dialog>
)

export default YesNo
