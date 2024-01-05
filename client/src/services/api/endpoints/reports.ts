import { FetchArgs } from "@reduxjs/toolkit/query"
import type { ApiEndpointBuilder } from ".."
import { DateTime } from "luxon"
export const getSalesReportApiMutationName = "getSalesReport"
export const getDailySalesReportApiMutationName = "getDailySalesReport"
export const getMonthlySalesReportApiMutationName = "getMonthlySalesReport"
export const getYearlySalesReportApiMutationName = "getYearlySalesReport"
export const getProfitLossReportApiMutationName = "getProfitLossReport"

export const getSalesReportUrl = "/v1/reports/sales"
export const getDailySalesReportUrl = "/v1/reports/sales/daily"
export const getMonthlySalesReportUrl = "/v1/reports/sales/monthly"
export const getYearlySalesReportUrl = "/v1/reports/sales/yearly"
export const getProfitLossReportUrl = "/v1/reports/profit-loss"

export type DateRangeQuery = {
  /** ISO date string */
  from?: string | null
  /** ISO date string */
  to?: string | null
}

export const constructDateRangeQuery = (
  params: DateRangeQuery,
  url: string,
): string | FetchArgs => {
  const { from, to } = params || {}

  const searchParams = new URLSearchParams()
  if (from) {
    searchParams.set("from", from)
  }
  if (to) {
    searchParams.set("to", to)
  }

  const finalUrl = `${url}?${searchParams.toString()}`

  return {
    url: finalUrl,
    method: "GET",
  }
}

export const getSalesReportBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    DateRangeQuery
  >({
    query: (params) => constructDateRangeQuery(params, getSalesReportUrl),
  })
}

export const getDailySalesBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    Date | null | undefined
  >({
    query: () => ({
      url: getDailySalesReportUrl,
      method: "GET",
    }),
  })
}

export const getMonthlySalesBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    Date | null | undefined
  >({
    query: () => ({
      url: getMonthlySalesReportUrl,
      method: "GET",
    }),
  })
}

export const getYearlySalesBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.SaleReport>,
    Date | null | undefined
  >({
    query: () => ({
      url: getYearlySalesReportUrl,
      method: "GET",
    }),
  })
}

export const getProfitLossBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<Monorepo.Api.Response.ProfitLossReport>,
    DateRangeQuery
  >({
    query: (params) => constructDateRangeQuery(params, getProfitLossReportUrl),
  })
}
