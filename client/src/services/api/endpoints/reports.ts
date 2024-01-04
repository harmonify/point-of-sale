import type { ApiEndpointBuilder } from ".."
import { constructQueryPaginationInfo } from "../utils"

export const getDailySalesApiMutationName = "getDailySales"
export const getMonthlySalesApiMutationName = "getMonthlySales"
export const getYearlySalesApiMutationName = "getYearlySales"

export const getDailySalesUrl = "/v1/reports/sales/daily"
export const getMonthlySalesUrl = "/v1/reports/sales/monthly"
export const getYearlySalesUrl = "/v1/reports/sales/yearly"

export const getDailySalesBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    null | void
  >({
    query: () => ({
      url: getDailySalesUrl,
      method: "GET",
    }),
  })
}

export const getMonthlySalesBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    null | void
  >({
    query: () => ({
      url: getMonthlySalesUrl,
      method: "GET",
    }),
  })
}

export const getYearlySalesBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    null | void
  >({
    query: () => ({
      url: getYearlySalesUrl,
      method: "GET",
    }),
  })
}
