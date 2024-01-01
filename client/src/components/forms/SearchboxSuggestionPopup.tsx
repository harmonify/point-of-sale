import { Box, List, ListItem, ListItemText } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import { t } from "i18next"
import React, {
  ChangeEventHandler,
  Component,
  forwardRef,
  useEffect,
  useState,
} from "react"
import useMeasure from "react-use-measure"

import Searchbox, { ISearchBoxProps } from "./Searchbox"

type IAutoSuggestionPopUpParams<T> = {
  data: T[]
  onSelected: (d: T) => void
  onValueChange: (searchTerm: string) => void
} & ISearchBoxProps

const SearchboxSuggestionPopup = <
  T extends { name: string } & Record<string, any>,
>({
  data,
  onSelected,
  onValueChange,
  ...restProps
}: IAutoSuggestionPopUpParams<T>): React.ReactNode => {
  const [hideSuggestion, setHideSuggestion] = useState(true)
  const [ref, bounds] = useMeasure()

  const renderNoData = () => {
    return (
      <ListItem>
        <ListItemText>
          <span style={{ fontSize: "0.95rem" }}>
            {t("No records found", { ns: "message" })}
          </span>
        </ListItemText>
      </ListItem>
    )
  }

  const renderOptions = () => {
    if (!data) {
      return null
    }
    return data.map((d, index) => (
      <ListItem
        button
        key={index}
        onClick={() => {
          onSelected(d)
          setHideSuggestion(true)
        }}
      >
        <ListItemText>
          <span style={{ fontSize: "0.95rem" }}>{d.name}</span>
        </ListItemText>
      </ListItem>
    ))
  }

  const renderSuggestions = () => {
    if (hideSuggestion === true) {
      return null
    }

    return (
      <Paper
        elevation={4}
        style={{ position: "absolute", width: bounds.width, zIndex: 1000 }}
      >
        <List component="nav">
          {data && data.length > 0 ? renderOptions() : renderNoData()}
        </List>
      </Paper>
    )
  }

  const onFocus = () => {
    setHideSuggestion(false)
  }

  return (
    <Box>
      <Searchbox
        {...restProps}
        onValueChange={onValueChange}
        onFocus={onFocus}
        size="medium"
        style={{ width: bounds.width }}
        ref={ref}
      />
      {renderSuggestions()}
    </Box>
  )
}

export default SearchboxSuggestionPopup
