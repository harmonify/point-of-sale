import store, { RootState } from "@/app/store"
import { API_BASE_URL } from "@/environment"
import {
  selectAuthCredentials,
  setCredentials,
  setLogout,
} from "@/features/auth"
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import { Mutex } from "async-mutex"

import { logger } from "../logger"

// create a new mutex
const mutex = new Mutex()

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
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        logger.debug("Unauthorized. Start refresh token auth flow.")
        const authCredentials = selectAuthCredentials(store.getState())
        if (!(authCredentials && authCredentials.refreshToken)) {
          return {
            error: {
              status: "FETCH_ERROR",
              error: "Refresh token is empty",
            },
          }
        }

        const refreshResult = await baseQuery(
          {
            url: "/v1/auth/refresh-token",
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
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          logger.debug("Error when executing refresh token auth flow.")
          api.dispatch(setLogout())
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
