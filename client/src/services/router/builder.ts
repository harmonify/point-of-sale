import store from "@/app/store"
import { showSnackbar } from "@/features/snackbar"
import { logger } from "@/services/logger"
import { parseApiErrorMessage } from "@/utils"
import { ApiEndpointQuery } from "@reduxjs/toolkit/query"
import { LoaderFunction, redirect } from "react-router-dom"

interface IListLoaderBuilderParams {
  apiEndpointQuery: ApiEndpointQuery<any, any>
  /** Fetch all records? */
  all?: boolean
}

interface IDetailLoaderBuilderParams {
  apiEndpointQuery: ApiEndpointQuery<any, any>
  redirectOnErrorUrl: string
}

export const modelListLoaderBuilder = ({
  apiEndpointQuery,
  all,
}: IListLoaderBuilderParams): LoaderFunction => {
  return async ({ params }) => {
    const promise = store.dispatch(
      apiEndpointQuery.initiate({ all: Boolean(all) }),
    )
    try {
      const response = (await promise.unwrap()) as any
      return response && typeof response === "object" && response.data
        ? response.data
        : response
    } catch (e) {
      // see https://reactrouter.com/en/main/fetch/redirect
      return redirect("/error")
    } finally {
      promise.unsubscribe()
    }
  }
}

export const modelDetailLoaderBuilder = ({
  apiEndpointQuery,
  redirectOnErrorUrl,
}: IDetailLoaderBuilderParams): LoaderFunction => {
  return async ({ params }) => {
    const promise = store.dispatch(
      apiEndpointQuery.initiate({ id: params.id! }),
    )
    try {
      const response = (await promise.unwrap()) as any
      return response && typeof response === "object" && response.data
        ? response.data
        : response
    } catch (e) {
      // see https://reactrouter.com/en/main/fetch/redirect
      logger.error(e)
      store.dispatch(
        showSnackbar({ message: parseApiErrorMessage(e), variant: "error" }),
      )
      return redirect(redirectOnErrorUrl)
    } finally {
      promise.unsubscribe()
    }
  }
}
