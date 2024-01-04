import type { ApiEndpointBuilder } from ".."
export const getDailySalesApiMutationName = "getDailySales"
export const getMonthlySalesApiMutationName = "getMonthlySales"
export const getYearlySalesApiMutationName = "getYearlySales"
export const getProfitLossApiMutationName = "getProfitLoss"

export const getDailySalesUrl = "/v1/reports/sales/daily"
export const getMonthlySalesUrl = "/v1/reports/sales/monthly"
export const getYearlySalesUrl = "/v1/reports/sales/yearly"
export const getProfitLossUrl = "/v1/reports/profit-loss"

export const getDailySalesBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    Date | null
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
    Date | null
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
    Date | null
  >({
    query: () => ({
      url: getYearlySalesUrl,
      method: "GET",
    }),
  })
}

export const getProfitLossBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    Date | null
  >({
    query: () => ({
      url: getYearlySalesUrl,
      method: "GET",
    }),
  })
}
