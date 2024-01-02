import { FetchArgs } from "@reduxjs/toolkit/query"

export const constructQueryPaginationInfo = (
  paginationInfoDto: Partial<Monorepo.Api.Request.RequestPaginationInfoDto> | void,
  url: string,
): string | FetchArgs => {
  const { page, perPage, search, all = false } = paginationInfoDto || {}

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
}
