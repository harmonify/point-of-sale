import { useContext, useEffect } from "react"
import {
  ConfirmationDialogContext,
  IConfirmationDialogState,
} from "../ConfirmationDialogProvider"

const useConfirmationDialog = (
  props?: Omit<IConfirmationDialogState, "open">,
) => {
  const { setState, show, close } = useContext(ConfirmationDialogContext)!

  useEffect(() => {
    return setState({ ...props, open: false })
  }, [])

  return {
    show,
    close,
  }
}

export default useConfirmationDialog
