import store from "@/app/store"
import type { ApiEndpointBuilder } from "."
import { showSnackbar } from "@/features/snackbar"
import { t } from "i18next"
import { cacher } from "./rtkQueryCacheUtils"

const builder = <
  TGet extends { id: number | string },
  TCreate = unknown,
  TUpdate = unknown,
>(
  builder: ApiEndpointBuilder,
  /** Resource name */
  resourceName: string,
  /** API version */
  version: string = "v1",
) => ({
  create: builder.mutation<
    Monorepo.Api.Response.ResponseBodyDto<TGet>,
    TCreate
  >({
    query: (body) => ({
      url: `/${version}/${resourceName}`,
      method: "POST",
      body,
    }),
    invalidatesTags: cacher.invalidatesList(resourceName),
    onQueryStarted: async (arg, { queryFulfilled, getState, requestId }) => {
      await queryFulfilled
      store.dispatch(
        showSnackbar({
          message: t(`Data created successfully`, {
            ns: "message",
            model: t(resourceName as any),
          }),
          variant: "success",
        }),
      )
    },
  }),

  findAll: builder.query<
    Monorepo.Api.Response.ResponseBodyDto<TGet[]>,
    Partial<Monorepo.Api.Request.RequestPaginationInfoDto> | void
  >({
    query: (paginationInfoDto) => {
      const { page, perPage, search, all = false } = paginationInfoDto || {}

      const url = `/${version}/${resourceName}`

      const searchParams = new URLSearchParams()
      if (all) {
        searchParams.set("all", "true")
      } else {
        if (page && perPage) {
          searchParams.set("page", page.toString())
          searchParams.set("per_page", perPage.toString())
        }
        if (search) {
          searchParams.set("search", search)
        }
      }

      const finalUrl = `${url}?${searchParams.toString()}`

      return {
        url: finalUrl,
        method: "GET",
      }
    },
    providesTags: (results, error) =>
      cacher.providesList(resourceName)(results?.data, error),
  }),

  findOne: builder.query<
    Monorepo.Api.Response.ResponseBodyDto<TGet>,
    { id: string | number }
  >({
    query: ({ id }) => ({
      url: `/${version}/${resourceName}/${id}`,
      method: "GET",
    }),
    providesTags: cacher.cacheByIdArgProperty(resourceName),
  }),

  update: builder.mutation<
    Monorepo.Api.Response.ResponseBodyDto<TGet>,
    { id: string | number; data: TUpdate }
  >({
    query: ({ id, data }) => ({
      url: `/${version}/${resourceName}/${id}`,
      method: "PUT",
      body: data,
    }),
    invalidatesTags: cacher.cacheByIdArgProperty(resourceName),
    onQueryStarted: async (arg, { queryFulfilled }) => {
      await queryFulfilled
      store.dispatch(
        showSnackbar({
          message: t(`Data updated successfully`, {
            ns: "message",
            model: t(resourceName as any),
          }),
          variant: "success",
        }),
      )
    },
  }),

  delete: builder.mutation<
    Monorepo.Api.Response.ResponseBodyDto<never>,
    { id: string | number }
  >({
    query: ({ id }) => ({
      url: `/${version}/${resourceName}/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: cacher.cacheByIdArgProperty(resourceName),
    onQueryStarted: async (arg, { queryFulfilled, getState }) => {
      await queryFulfilled
      store.dispatch(
        showSnackbar({
          message: t(`Data deleted successfully`, {
            ns: "message",
            model: t(resourceName as any),
          }),
          variant: "success",
        }),
      )
    },
  }),
})

export default builder
