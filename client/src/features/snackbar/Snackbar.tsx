import { Fade } from "@material-ui/core"
import MuiSnackbar, {
  SnackbarCloseReason,
  SnackbarOrigin,
} from "@material-ui/core/Snackbar"
import React from "react"

import Alert from "./Alert"

const Snackbar: React.FC<{
  open: boolean
  onClose: (
    event: React.SyntheticEvent<any>,
    reason?: SnackbarCloseReason,
  ) => void
  message: string
  variant: "default" | "info" | "success" | "warning" | "error"
  anchorOrigin: SnackbarOrigin
  autoHideDuration?: number
}> = ({
  open,
  onClose,
  message,
  variant,
  anchorOrigin = { vertical: "top", horizontal: "center" },
  autoHideDuration,
}) => (
  <MuiSnackbar
    open={open}
    autoHideDuration={autoHideDuration || 3000}
    onClose={onClose}
    key="top,center"
    anchorOrigin={anchorOrigin}
    TransitionComponent={Fade}
  >
    <Alert message={message} onClose={onClose} variant={variant} />
  </MuiSnackbar>
)

export default Snackbar
