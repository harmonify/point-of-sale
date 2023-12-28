import { logger } from "@/services/logger"
import { useDebounce } from "@uidotdev/usehooks"
import Fuse, { FuseResult, IFuseOptions } from "fuse.js"
import { useCallback, useEffect, useMemo, useState } from "react"

/**
 * @see {@link https://www.fusejs.io/api/options.html} Options API Reference
 * @see {@link https://www.fusejs.io/concepts/scoring-theory.html} Scoring theory on Fuse.js
 */
const defaultOptions: IFuseOptions<unknown> = {
  /**
   * Used for highlighting purposes.
   */
  includeMatches: true,
  /**
   * @see {@link https://www.fusejs.io/api/options.html#threshold}
   * A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything.
   * The threshold value is lowered here to allow matches in more strict manners.
   */
  threshold: 0.3,
  /**
   * Avoid single character match
   */
  minMatchCharLength: 1,
  /**
   * Useful for searching long texts, but it makes searching shorter texts somewhat less effective (personal opinion)
   */
  ignoreLocation: true,
  /**
   * Sort the search result list by score ascendingly.
   * A score of 0 indicates a perfect match, while a score of 1 indicates a complete mismatch.
   * @see {@link https://www.fusejs.io/api/options.html#includescore}
   */
  shouldSort: true,
}

const useFuzzySearch = <TModel>({
  data,
  options = {},
  useDefaultOptions = true,
  debounceMs = 200,
}: {
  data: ReadonlyArray<TModel>
  options?: IFuseOptions<TModel>
  useDefaultOptions?: boolean
  debounceMs?: number
}): {
  searchTerm: string
  search: (term: string) => void
  loading: boolean
  results: FuseResult<TModel>[]
  /** Result items */
  items: TModel[]
} => {
  const [searchTerm, search] = useState<string>("")
  const debouncedSearchTerm = useDebounce<string>(searchTerm, debounceMs)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<FuseResult<TModel>[]>([])

  const fuse = useMemo(() => {
    const finalOptions = (
      useDefaultOptions ? { ...defaultOptions, ...options } : options
    ) satisfies IFuseOptions<TModel>
    return new Fuse(data, finalOptions)
  }, [data, options, useDefaultOptions])

  useEffect(() => {
    setLoading(true)
    if (debouncedSearchTerm) {
      const results = fuse.search(debouncedSearchTerm)
      logger.debug(
        `🚀 ~ useFuzzySearch ~ { data[0], results } ~ ${JSON.stringify(
          { "data[0]": data[0], results },
          null,
          2,
        )}`,
      )
      setResults(results)
    } else {
      setResults([])
    }
    setLoading(false)
  }, [data, debouncedSearchTerm])

  return {
    searchTerm: debouncedSearchTerm,
    search,
    loading,
    results,
    items: results.map((result) => result.item),
  }
}

export default useFuzzySearch
