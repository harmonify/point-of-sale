import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@material-ui/core"
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
  renderListItem?: (d: T) => React.ReactNode
  loading?: boolean
} & ISearchBoxProps

const SearchboxSuggestionPopup = <
  T extends { name: string } & Record<string, any>,
>({
  data,
  onSelected,
  onValueChange,
  renderListItem,
  loading,
  ...restProps
}: IAutoSuggestionPopUpParams<T>): React.ReactNode => {
  const theme = useTheme()
  const [hideSuggestion, setHideSuggestion] = useState(true)
  const [ref, bounds] = useMeasure()

  const renderLoading = () => {
    return (
      <ListItem>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      </ListItem>
    )
  }

  const renderNoData = () => {
    return (
      <ListItem>
        <ListItemText>
          <Typography style={{ fontSize: "0.95rem" }}>
            {t("No records found", { ns: "message" })}
          </Typography>
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
        {typeof renderListItem === "function" ? (
          renderListItem(d)
        ) : (
          <ListItemText>
            <Typography style={{ fontSize: "0.95rem" }}>{d.name}</Typography>
          </ListItemText>
        )}
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
        style={{
          position: "absolute",
          width: bounds.width,
          zIndex: 1000,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <List component="nav">
          {loading
            ? renderLoading()
            : data && data.length > 0
            ? renderOptions()
            : renderNoData()}
        </List>
      </Paper>
    )
  }

  const onFocus = () => {
    setHideSuggestion(false)
  }

  const onBlur = () => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 120)
    }).then(() => {
      setHideSuggestion(true)
    })
  }

  return (
    <Box>
      <Searchbox
        {...restProps}
        onValueChange={onValueChange}
        onFocus={onFocus}
        onBlur={onBlur}
        size="medium"
        style={{ width: bounds.width }}
        ref={ref}
      />
      {renderSuggestions()}
    </Box>
  )
}

export default SearchboxSuggestionPopup
