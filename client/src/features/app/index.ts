import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AppUIState {
  title: string
  openMobileDrawer: boolean
  darkMode: boolean
  rootRef: React.MutableRefObject<HTMLDivElement | null> | null
}

export const appSliceName = "app"

/**
 * Manage global app UI state
 */
const slice = createSlice({
  name: appSliceName,
  initialState: {
    title: "Point of Sales",
    openMobileDrawer: false,
    darkMode: window.matchMedia?.("(prefers-color-scheme: dark)").matches,
    rootRef: null,
  } as AppUIState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    showMobileDrawer: (state) => {
      state.openMobileDrawer = true
    },
    hideMobileDrawer: (state) => {
      state.openMobileDrawer = false
    },
    toggleMobileDrawer: (state) => {
      state.openMobileDrawer = !state.openMobileDrawer
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    },
    setRootRef: (
      state,
      action: PayloadAction<React.MutableRefObject<HTMLDivElement | null>>,
    ) => {
      state.rootRef = action.payload
    },
  },
})

export default slice.reducer

export const {
  setPageTitle,
  showMobileDrawer,
  hideMobileDrawer,
  toggleMobileDrawer,
  toggleDarkMode,
  setDarkMode,
  setRootRef,
} = slice.actions

export const selectPageTitle = (state: RootState) => state.app.title

export const selectShouldOpenMobileDrawer = (state: RootState) =>
  state.app.openMobileDrawer

export const selectDarkMode = (state: RootState) => state.app.darkMode

export const selectRootRef = (state: RootState) => state.app.rootRef
