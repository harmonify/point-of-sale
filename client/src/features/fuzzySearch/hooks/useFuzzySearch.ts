import Fuse, { FuseResult, IFuseOptions } from "fuse.js"
import { useEffect, useMemo, useState } from "react"

interface UseFuzzySearchResult<T> {
  results: FuseResult<T>[]
  handleSearch: (term: string) => void
}

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
  minMatchCharLength: 2,
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

const useFuzzySearch = <T>(
  data: ReadonlyArray<T>,
  options: IFuseOptions<T>,
  useDefaultOptions: boolean = true,
): UseFuzzySearchResult<T> => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [results, setResults] = useState<FuseResult<T>[]>([])

  const fuse = useMemo(() => {
    const finalOptions = (
      useDefaultOptions
        ? { ...defaultOptions, ...options, includeMatches: true }
        : options
    ) satisfies IFuseOptions<T>
    return new Fuse(data, finalOptions)
  }, [data, options])

  useEffect(() => {
    if (Array.isArray(data)) {
      setResults(fuse.search(searchTerm))
    } else {
      setResults([])
    }
  }, [data, fuse, searchTerm])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  return { results, handleSearch }
}

export default useFuzzySearch
