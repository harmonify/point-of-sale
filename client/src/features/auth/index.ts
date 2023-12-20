import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
  user?: Monorepo.Api.Response.UserResponseDto | null
  accessToken?: string | null
  refreshToken?: string | null
}

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
  } as AuthState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<AuthState | null>) => {
      const {
        user = null,
        accessToken = null,
        refreshToken = null,
      } = payload || {}
      state.user = user
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    setLogout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

export default slice.reducer

export const { setCredentials, setLogout } = slice.actions

export const selectAuthCredentials = (state: RootState) => state.auth

export const selectCurrentUser = (state: RootState) => state.auth.user
