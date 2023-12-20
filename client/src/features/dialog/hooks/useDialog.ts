import { useCallback, useContext } from "react"
import { ConfirmationDialogContext } from "../provider"

const useDialog = ({ loader } = { loader: false }) => {
  const { setState, close, state } = useContext(ConfirmationDialogContext)

  if (loader && !state.isLoading) {
    setState({
      ...state,
      isLoading: loader,
    })
  }

  const show = useCallback(
    ({
      title = "",
      content = "",
      variant = "constructive",
      confirmText = "",
      cancelText = "",
      onConfirm = null,
      onCancel = null,
      fullWidthBtn = false,
    }) => {
      setState({
        open: true,
        title,
        content,
        variant,
        confirmText,
        cancelText,
        onConfirm,
        onCancel,
        fullWidthBtn,
      })
    },
    [],
  )

  return {
    show,
    close,
  }
}

export default useDialog
