import store from "@/app/store"
import type { ApiEndpointBuilder } from "."
import { showSnackbar } from "@/features/snackbar"
import { t } from "i18next"

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
    invalidatesTags: (result) => {
      return result && result.data
        ? [
            { type: resourceName, id: result.data.id },
            { type: resourceName, id: "LIST" },
          ]
        : []
    },
    onQueryStarted: async (arg, { queryFulfilled, getState, requestId }) => {
      const response = await queryFulfilled
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
    providesTags: (result) =>
      result && result.data
        ? [
            ...result.data.map(({ id }) => ({ type: resourceName, id })),
            { type: resourceName, id: "LIST" },
          ]
        : [{ type: resourceName, id: "LIST" }],
  }),

  findOne: builder.query<
    Monorepo.Api.Response.ResponseBodyDto<TGet>,
    { id: string | number }
  >({
    query: ({ id }) => ({
      url: `/${version}/${resourceName}/${id}`,
      method: "GET",
    }),
    providesTags: (result) =>
      result && result.data ? [{ type: resourceName, id: result.data.id }] : [],
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
    invalidatesTags: (result, error, arg, meta) => {
      return error
        ? []
        : [
            { type: resourceName, id: arg.id },
            { type: resourceName, id: "LIST" },
          ]
    },
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
    invalidatesTags: (result, error, arg, meta) => {
      return error
        ? []
        : [
            { type: resourceName, id: arg.id },
            { type: resourceName, id: "LIST" },
          ]
    },
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
