import { InputAdornment } from "@material-ui/core"
import Search from "@material-ui/icons/Search"
import { t } from "i18next"
import React from "react"

import TextInput, { ITextInputProps } from "./TextInput"

type ISearchBoxProps = {
  onValueChange: (search: string) => void
} & ITextInputProps

const Searchbox: React.FC<ISearchBoxProps> = (props) => {
  return (
    <TextInput
      {...props}
      onChange={(e) => {
        if (props.onChange) props.onChange(e)
        props.onValueChange(e.target.value)
      }}
      placeholder={
        props.placeholder
          ? props.placeholder
          : t("Enter your query", { ns: "action" })
      }
      fullWidth={typeof props.fullWidth === "boolean" ? props.fullWidth : false}
      margin={props.margin || "dense"}
      size={props.size || "small"}
      style={{ minWidth: 320 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search fontSize={props.size || "small"} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default Searchbox
