import React, {
  createContext,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react"

import ConfirmationDialog from "./ConfirmationDialog"

type IDialogConfirmationProps =
  | {
      confirmText?: string | null
      onConfirm?: MouseEventHandler | null
    }
  | {
      confirmText: string
      onConfirm: MouseEventHandler
    }

type IDialogCancellationProps =
  | {
      cancelText?: string | null
      onCancel?: (() => void) | null
    }
  | {
      cancelText: string
      onCancel: () => void
    }

export type IConfirmationDialogState = {
  open: boolean
  content: string
  title?: string
  variant?: "destructive" | "constructive" | "neutral" | null
  isLoading?: boolean
  fullWidthBtn?: boolean
  disableCancelButton?: boolean
} & IDialogConfirmationProps &
  IDialogCancellationProps

const defaultState: IConfirmationDialogState = {
  open: false,
  title: "",
  content: "",
  variant: "neutral",
  isLoading: false,
  fullWidthBtn: false,

  confirmText: null,
  onConfirm: null,

  disableCancelButton: false,
  cancelText: null,
  onCancel: null,
}

export const ConfirmationDialogContext = createContext<{
  state: IConfirmationDialogState
  setState: (newState: IConfirmationDialogState) => void
  show: (newState?: Omit<IConfirmationDialogState, "open">) => void
  close: () => void
} | null>(null)

const ConfirmationDialogProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [state, setState] = useState(defaultState)

  const show = useCallback(
    (newState?: Omit<IConfirmationDialogState, "open">) => {
      setState((prev) => ({ ...prev, ...newState, open: true }))
    },
    [state],
  )
  const close = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }))
  }, [state])

  const values = useMemo(
    () => ({ state, setState, show, close }),
    [state, setState, show, close],
  )

  return (
    <ConfirmationDialogContext.Provider value={values}>
      {children}
      <ConfirmationDialog
        {...state}
        onConfirm={
          state.onConfirm != undefined
            ? (...args) => {
                state.onConfirm!(...args)
                close()
              }
            : close
        }
        onCancel={
          state.onCancel != undefined
            ? (...args) => {
                state.onCancel!(...args)
                close()
              }
            : close
        }
      />
    </ConfirmationDialogContext.Provider>
  )
}

export default ConfirmationDialogProvider
