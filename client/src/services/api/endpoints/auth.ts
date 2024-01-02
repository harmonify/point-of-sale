import { setCredentials, setLogout } from "@/features/auth"
import { purgeStoreAndNavigate } from "@/features/auth/util"
import type { ApiEndpointBuilder } from ".."
import { cacher } from "../utils/rtkQueryCacheUtils"

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
    invalidatesTags: cacher.invalidatesUnauthorized(),
    async onQueryStarted(arg, api) {
      try {
        const { data } = await api.queryFulfilled
        const cacheEntry = api.getCacheEntry()
        if (cacheEntry.isSuccess && data) {
          api.dispatch(setCredentials(data.data))
        } else if (cacheEntry.isError) {
          await purgeStoreAndNavigate()
        }
      } catch (error) {
        await purgeStoreAndNavigate()
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
    invalidatesTags: cacher.invalidatesUnauthorized(),
    async onQueryStarted(arg, api) {
      try {
        const { data } = await api.queryFulfilled
        const cacheEntry = api.getCacheEntry()
        if (cacheEntry.isSuccess && data) {
          api.dispatch(setCredentials(data.data))
        } else if (cacheEntry.isError) {
          await purgeStoreAndNavigate()
        }
      } catch (error) {
        await purgeStoreAndNavigate()
      }
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
    async onQueryStarted(arg, api) {
      try {
        await api.queryFulfilled
      } finally {
        await purgeStoreAndNavigate()
      }
    },
  })
}
