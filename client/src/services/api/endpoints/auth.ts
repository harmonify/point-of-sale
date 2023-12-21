import { setCredentials, setLogout } from "@/features/auth"
import type { ApiEndpointBuilder } from ".."
import store from "@/app/store"

export const postLoginMutationName = "postLogin"
export const postRefreshTokenMutationName = "postRefreshToken"
export const postLogoutMutationName = "postLogout"

export const postLoginUrl = "/v1/auth/login"
export const postRefreshTokenUrl = "/v1/auth/refresh-token"
export const postLogoutUrl = "/v1/auth/logout"

export const postLoginBuilder = (builder: ApiEndpointBuilder) => {
  return builder.mutation<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.LoginResponseDto>,
    Monorepo.Api.Request.LoginRequestDto
  >({
    query: (body) => ({
      url: postLoginUrl,
      method: "POST",
      body,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled, getCacheEntry }) {
      const { data } = await queryFulfilled
      if (getCacheEntry().isSuccess && data) {
        store.dispatch(setCredentials(data.data))
      }
    },
  })
}

export const postRefreshTokenBuilder = (builder: ApiEndpointBuilder) => {
  return builder.mutation<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.RefreshTokenResponseDto>,
    Monorepo.Api.Request.RefreshTokenRequestDto
  >({
    query: (body) => ({
      url: postRefreshTokenUrl,
      method: "POST",
      body,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      const { data } = await queryFulfilled
      store.dispatch(
        setCredentials({ refreshToken: arg.refreshToken, ...data.data }),
      )
    },
  })
}

export const postLogoutBuilder = (builder: ApiEndpointBuilder) => {
  return builder.mutation<null, Monorepo.Api.Request.LogoutRequestDto>({
    query: (body) => ({
      url: postLogoutUrl,
      method: "POST",
      body,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      await queryFulfilled
      // if (data)
      store.dispatch(setLogout())
    },
  })
}
