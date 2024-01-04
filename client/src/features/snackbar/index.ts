import { SnackbarOrigin } from "@mui/material"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IAlertVariant } from "./Alert"

export interface SnackbarState {
  isShown: boolean
  message: string
  variant: IAlertVariant
  anchorOrigin: SnackbarOrigin
  autoHideDuration: number
}

export interface ShowSnackbarPayload {
  message: string
  variant?: IAlertVariant
  anchorOrigin?: SnackbarOrigin
  autoHideDuration?: number
}

const slice = createSlice({
  name: "snackbar",
  initialState: {
    isShown: false,
    message: "",
    variant: "default",
    anchorOrigin: { vertical: "top", horizontal: "center" },
    autoHideDuration: 5000,
  } as SnackbarState,
  reducers: {
    showSnackbar: (state, data: PayloadAction<ShowSnackbarPayload>) => {
      state.isShown = true
      state.message = data.payload.message
      state.autoHideDuration = data.payload.autoHideDuration || 3000

      state.variant =
        data.payload.variant &&
        ["default", "info", "success", "warning", "error"].includes(
          data.payload.variant,
        )
          ? data.payload.variant
          : "default"

      state.anchorOrigin = data.payload.anchorOrigin || {
        vertical: "top",
        horizontal: "center",
      }
    },
    hideSnackbar: (state) => {
      state.isShown = false
    },
  },
})

export const { showSnackbar, hideSnackbar } = slice.actions

export const selectSnackbarState = (state: RootState) => state.snackbar

export default slice.reducer
