import { RootState, persistor } from "@/app/store"
import { API_BASE_URL, APP_ENV } from "@/environment"
import {
  selectAuthCredentials,
  setCredentials,
  setLogout,
} from "@/features/auth"
import { purgeStoreAndNavigate } from "@/features/auth/util"
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import { Mutex } from "async-mutex"

import { logger } from "../logger"
import {
  postLoginMutationName,
  postLogoutMutationName,
  postRefreshTokenMutationName,
  postRefreshTokenUrl,
} from "./endpoints/auth"

// create a new mutex
const mutex = new Mutex()

const BLACKLISTED_REAUTH_ENDPOINTS = [
  postLoginMutationName,
  postRefreshTokenMutationName,
  postLogoutMutationName,
]

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  timeout: 60000,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken
    // If we have a accessToken set in state, let's assume that we should be passing it.
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)
  if (BLACKLISTED_REAUTH_ENDPOINTS.includes(api.endpoint)) {
    return result
  }

  if (result!.error && result!.error.status === 401) {
    // TODO: Is this stable?
    if (
      ["production", "staging"].includes(APP_ENV) &&
      result!.error.status >= 500
    ) {
      // router.navigate("/error")
    }

    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        logger.debug("Unauthorized. Start refresh token auth flow.")
        const authCredentials = selectAuthCredentials(
          api.getState() as RootState,
        )
        if (!(authCredentials && authCredentials.refreshToken)) {
          logger.debug(
            "Failed to execute refresh token auth flow. Refresh token is empty",
          )
          purgeStoreAndNavigate()
          return result
        }

        const refreshResult = await baseQuery(
          {
            url: postRefreshTokenUrl,
            method: "POST",
            body: { refreshToken: authCredentials.refreshToken },
          },
          api,
          extraOptions,
        )

        if (refreshResult && refreshResult.data) {
          const credentials =
            refreshResult.data as Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.RefreshTokenResponseDto>

          api.dispatch(setCredentials(credentials.data))
          logger.debug("Successfully ran the refresh token auth flow.")
          logger.debug("Retry the initial query.")
          result = await baseQuery(args, api, extraOptions)
        } else {
          logger.debug("Error when executing refresh token auth flow.")
          purgeStoreAndNavigate()
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export default baseQueryWithReauth
