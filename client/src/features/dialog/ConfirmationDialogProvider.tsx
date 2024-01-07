import React, {
  createContext,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react"

import ConfirmationDialog from "./ConfirmationDialog"
import { Breakpoint } from "@mui/material"

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

type IDialogContentProps = {
  /** Controls the dialog max width */
  maxWidth?: false | Breakpoint | undefined
  /** The body content */
  content?: string
  /** Render the dialog body. If provided, will be prioritized over `content` */
  render?: React.ReactNode
  /** Render the dialog actions. If provided, both confirm and cancel button will not be rendered*/
  renderActions?: React.ReactNode
}

export type IConfirmationDialogState = {
  open: boolean
  title?: string
  variant?: "destructive" | "constructive" | "neutral" | null
  isLoading?: boolean
  fullWidthBtn?: boolean
  disableConfirmButton?: boolean
  disableCancelButton?: boolean
} & IDialogContentProps &
  IDialogConfirmationProps &
  IDialogCancellationProps

type IShowDialogConfirmationParams = Omit<
  IConfirmationDialogState,
  "open" | "content"
> & {
  content?: string
}

const defaultState: IConfirmationDialogState = {
  open: false,
  title: "",
  content: "",
  variant: "neutral",
  isLoading: false,
  fullWidthBtn: false,

  disableConfirmButton: false,
  confirmText: null,
  onConfirm: null,

  disableCancelButton: false,
  cancelText: null,
  onCancel: null,
}

export const ConfirmationDialogContext = createContext<{
  state: IConfirmationDialogState
  setState: (newState: IConfirmationDialogState) => void
  show: (newState?: IShowDialogConfirmationParams, refresh?: boolean) => void
  close: () => void
} | null>(null)

const ConfirmationDialogProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [state, setState] = useState(defaultState)

  const show = useCallback(
    (newState?: IShowDialogConfirmationParams, refresh = false) => {
      setState((prev) => {
        return refresh
          ? { ...newState, open: true }
          : { ...prev, ...newState, open: true }
      })
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
