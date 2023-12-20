import React, { createContext, useCallback, useMemo, useState } from "react"
import Dialog from "./Dialog"

const defaultState = {
  open: false,
  title: "",
  content: "",
  variant: "constructive",
  confirmText: "",
  cancelText: "",
  onConfirm: null,
  onCancel: null,
  isLoading: false,
  fullWidthBtn: false,
}

export const ConfirmationDialogContext = createContext(defaultState)

const ConfirmationDialogProvider: React.FC<{
  children: React.ReactElement
}> = ({ children }) => {
  const [state, setState] = useState(defaultState)

  const onClose = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }))
  }, [state])

  const values = useMemo(
    () => ({ state, onClose, setState }),
    [state, onClose, setState],
  )

  return (
    <ConfirmationDialogContext.Provider value={values}>
      <Dialog {...state} onClose={onClose}>
        {children}
      </Dialog>
    </ConfirmationDialogContext.Provider>
  )
}

export default ConfirmationDialogProvider
