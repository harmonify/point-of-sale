import { InputAdornment } from "@mui/material"
import Search from "@mui/icons-material/Search"
import { t } from "i18next"
import React, { forwardRef, useEffect, useState } from "react"

import TextInput, { ITextInputProps } from "./TextInput"
import { useDebounce } from "@uidotdev/usehooks"

export type ISearchBoxProps = {
  /** With debounce */
  onValueChange: (searchTerm: string) => void
  /** Default: 200 */
  debounceMs?: number
} & ITextInputProps

const Searchbox = forwardRef<HTMLDivElement, ISearchBoxProps>(
  ({ onValueChange, debounceMs = 200, ...restProps }, ref) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const debouncedSearchTerm = useDebounce<string>(searchTerm, debounceMs)

    useEffect(() => {
      onValueChange(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    return (
      <TextInput
        {...restProps}
        ref={ref}
        onChange={(e) => {
          if (restProps.onChange) restProps.onChange(e)
          setSearchTerm(e.target.value)
        }}
        placeholder={
          restProps.placeholder
            ? restProps.placeholder
            : t("Enter your query", { ns: "action" })
        }
        fullWidth={
          typeof restProps.fullWidth === "boolean" ? restProps.fullWidth : false
        }
        margin={restProps.margin || "dense"}
        size={restProps.size || "small"}
        style={{ minWidth: 320 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize={restProps.size || "small"} />
            </InputAdornment>
          ),
        }}
      />
    )
  },
)

export default Searchbox
