import { setCredentials, setLogout } from "@/features/auth"
import type { ApiEndpointBuilder } from ".."
import store from "@/app/store"

export const postLoginBuilder = (builder: ApiEndpointBuilder) => {
  return builder.mutation<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.LoginResponseDto>,
    Monorepo.Api.Request.LoginRequestDto
  >({
    query: (body) => ({
      url: "/v1/auth/login",
      method: "POST",
      body,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      const { data } = await queryFulfilled
      store.dispatch(setCredentials(data.data))
    },
  })
}

export const postRefreshTokenBuilder = (builder: ApiEndpointBuilder) => {
  return builder.mutation<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.RefreshTokenResponseDto>,
    Monorepo.Api.Request.RefreshTokenRequestDto
  >({
    query: (body) => ({
      url: "/v1/auth/refresh-token",
      method: "POST",
      body,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      const { data } = await queryFulfilled
      store.dispatch(setCredentials({ refreshToken: arg.refreshToken, ...data.data }))
    },
  })
}

export const postLogoutBuilder = (builder: ApiEndpointBuilder) => {
  return builder.mutation<null, Monorepo.Api.Request.LogoutRequestDto>({
    query: (body) => ({
      url: "/v1/auth/logout",
      method: "POST",
      body,
    }),
    async onQueryStarted(arg, { dispatch }) {
      store.dispatch(setLogout())
    },
  })
}
