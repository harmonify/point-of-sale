import store from "@/app/store"
import { showSnackbar } from "@/features/snackbar"
import { logger } from "@/services/logger"
import { parseApiErrorMessage } from "@/utils"
import { isRejectedWithValue } from "@reduxjs/toolkit"
import type { MiddlewareAPI, Middleware, PayloadAction } from "@reduxjs/toolkit"
import { postLogoutMutationName } from "../endpoints/auth"

export const BLACKLISTED_ENDPOINTS_LOGGING = [postLogoutMutationName]

/**
 * Log a warning and show a toast (snackbar)!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) =>
  (next) =>
  (action: PayloadAction<Monorepo.Api.Response.ResponseBodyDto<unknown>>) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const data =
        action.payload && action.payload.data
          ? action.payload.data
          : action.payload
      logger.warn(data)
      if (action)
      store.dispatch(
        showSnackbar({
          message: parseApiErrorMessage(data),
          variant: "error",
        }),
      )
    }

    return next(action)
  }
