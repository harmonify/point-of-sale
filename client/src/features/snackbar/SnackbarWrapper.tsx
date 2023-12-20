import { useAppDispatch, useAppSelector } from "@/app/hooks"
import React from "react"

import { hideSnackbar } from "."
import Snackbar from "./Snackbar"

const SnackbarWrapper = () => {
  const dispatch = useAppDispatch()
  const snackbar = useAppSelector((state) => state.snackbar)
  const { isShown, message, variant, anchorOrigin } = snackbar

  return (
    <Snackbar
      open={isShown}
      onClose={() => dispatch(hideSnackbar())}
      message={message}
      variant={variant}
      anchorOrigin={anchorOrigin}
    />
  )
}

export default SnackbarWrapper
