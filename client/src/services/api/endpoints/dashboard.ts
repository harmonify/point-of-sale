import type { ApiEndpointBuilder } from ".."

export const getDashboardInfoBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.DashboardResponseDto>,
    any
  >({
    query: () => ({
      url: "/v1/dashboard",
      method: "GET",
    }),
  })
}
