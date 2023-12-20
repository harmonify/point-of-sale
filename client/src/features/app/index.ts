import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit"

export interface AppUIState {
  title: string
  shouldOpenMobileDrawer: boolean
}

const slice = createSlice({
  name: "app",
  initialState: {
    title: "Point of Sales",
    shouldOpenMobileDrawer: false,
  } as AppUIState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    toggleMobileDrawer: (state) => {
      state.shouldOpenMobileDrawer = !state.shouldOpenMobileDrawer
    },
  },
})

export default slice.reducer

export const { setPageTitle, toggleMobileDrawer } = slice.actions

export const selectPageTitle = (state: RootState) => state.app.title

export const selectShouldOpenMobileDrawer = (state: RootState) =>
  state.app.shouldOpenMobileDrawer
