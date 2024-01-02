import type { ApiEndpointBuilder } from ".."
import { CategoryProductResponseDto } from "../../../../../server/src/modules/category"
import { constructQueryPaginationInfo } from "../utils"

export const findCategoriesProductsMutationName = "findCategoriesProducts"

export const findCategoriesProductsUrl = "/v1/categories/all/products"

export const findCategoriesProductsBuilder = (builder: ApiEndpointBuilder) => {
  return builder.query<
    Monorepo.Api.Response.ResponseBodyDto<CategoryProductResponseDto[]>,
    Partial<Monorepo.Api.Request.RequestPaginationInfoDto> | void
  >({
    query: (paginationInfoDto) =>
      constructQueryPaginationInfo(
        paginationInfoDto,
        findCategoriesProductsUrl,
      ),
  })
}
