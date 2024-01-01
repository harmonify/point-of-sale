import { useFuzzySearch } from "@/features/fuzzySearch"
import { FuseOptionKeyObject } from "fuse.js"

const useProductFuzzySearch = (
  data: Monorepo.Api.Response.ProductResponseDto[],
) => {
  return useFuzzySearch({
    data,
    debounceMs: 0,
    options: {
      includeMatches: false,
      keys: [
        {
          name: "barcode",
          getFn: (obj) => obj.barcode,
          weight: 1.5,
        },
        {
          name: "name",
          getFn: (obj) => obj.name,
          weight: 1,
        },
        {
          name: "description",
          getFn: (obj) => obj.description,
          weight: 0.5,
        },
        {
          name: "categoryName",
          getFn: (obj) =>
            (obj.category as Monorepo.Api.Response.CategoryResponseDto | null)
              ?.name,
          weight: 0.5,
        },
        {
          name: "createdByName",
          getFn: (obj) =>
            (obj.createdBy as Monorepo.Api.Response.UserResponseDto | null)
              ?.name,
          weight: 0.3,
        },
        {
          name: "createdAt",
          getFn: (obj) => obj.createdAt,
          weight: 0.2,
        },
        {
          name: "updatedAt",
          getFn: (obj) => obj.updatedAt,
          weight: 0.2,
        },
      ] as FuseOptionKeyObject<Monorepo.Api.Response.ProductResponseDto>[],
    },
  })
}

export default useProductFuzzySearch
