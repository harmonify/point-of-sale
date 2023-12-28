import React, { MouseEventHandler } from "react"
import Button from "@material-ui/core/Button"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@material-ui/core"

const FormDialog: React.FC<{
  open: boolean
  title: string
  subtitle: string
  children: React.ReactElement
  onSave: MouseEventHandler<HTMLButtonElement>
  onCancel: MouseEventHandler<HTMLButtonElement>
}> = (props) => {
  const theme = useTheme()

  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.title ? props.title : "Edit Item"}
        <br />
        <span style={{ fontSize: "12px", color: theme.palette.primary.main }}>
          {props.subtitle ? `(${props.subtitle})` : ""}
        </span>
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={props.onSave} color="primary" autoFocus>
          Save
        </Button>
        <Button onClick={props.onCancel} color="secondary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
