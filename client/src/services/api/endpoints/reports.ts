import type { ApiEndpointBuilder } from ".."
import { constructQueryPaginationInfo } from "../utils"

export const getTodaySalesApiMutationName = "getTodaySales"
export const getMonthlySalesApiMutationName = "getMonthlySales"
export const getYearlySalesApiMutationName = "getYearlySales"

export const getTodaySalesUrl = "/v1/reports/sales/today"
export const getMonthlySalesUrl = "/v1/reports/sales/monthly"
export const getYearlySalesUrl = "/v1/reports/sales/yearly"

export const getTodaySalesBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    void
  >({
    query: () => ({
      url: getTodaySalesUrl,
      method: "GET",
    }),
  })
}

export const getMonthlySalesBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    void
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
    void
  >({
    query: () => ({
      url: getYearlySalesUrl,
      method: "GET",
    }),
  })
}
