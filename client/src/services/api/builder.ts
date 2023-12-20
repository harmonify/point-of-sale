import type { ApiEndpointBuilder } from "."

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
    invalidatesTags: (result) =>
      result && result.data
        ? [
            { type: resourceName, id: result.data.id },
            { type: resourceName, id: "LIST" },
          ]
        : [],
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
    invalidatesTags: (result, error, arg, meta) =>
      !error
        ? [
            { type: resourceName, id: arg.id },
            { type: resourceName, id: "LIST" },
          ]
        : [],
  }),

  delete: builder.mutation<
    Monorepo.Api.Response.ResponseBodyDto<never>,
    { id: string | number }
  >({
    query: ({ id }) => ({
      url: `/v1/${resourceName}/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: (result, error, arg, meta) =>
      !error
        ? [
            { type: resourceName, id: arg.id },
            { type: resourceName, id: "LIST" },
          ]
        : [],
  }),
})

export default builder
