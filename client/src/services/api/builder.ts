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
  resourceName: string,
) => ({
  create: builder.mutation<
    Monorepo.Api.Response.ResponseBodyDto<TGet>,
    TCreate
  >({
    query: (body) => ({
      url: `/v1/${resourceName}`,
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
    onQueryStarted: async (arg, { queryFulfilled }) => {
      await queryFulfilled
      store.dispatch(
        showSnackbar({
          message: t(`Data created successfully`, {
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
      const { page, perPage, search } = paginationInfoDto || {}

      let url = `/v1/${resourceName}?`
      if (page && perPage) url += `page=${page},per_page=${perPage}`
      if (search) url += `,search=${search}`

      return {
        url,
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
      url: `/v1/${resourceName}/${id}`,
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
      url: `/v1/${resourceName}/${id}`,
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
      url: `/v1/${resourceName}/${id}`,
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
    onQueryStarted: async (arg, { queryFulfilled }) => {
      await queryFulfilled
      store.dispatch(
        showSnackbar({
          message: t(`Data deleted successfully`, {
            model: t(resourceName as any),
          }),
          variant: "success",
        }),
      )
    },
  }),
})

export default builder
