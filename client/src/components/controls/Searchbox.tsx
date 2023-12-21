import { InputAdornment } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Search from "@material-ui/icons/Search"
import React, {
  ChangeEventHandler,
  Component,
  FormEventHandler,
  useEffect,
  useState,
} from "react"

import CustomTextField from "./textfields/CustomTextField"
import { useDebounce } from "@uidotdev/usehooks"
import { t } from "i18next"

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      float: "none",
    },
    [theme.breakpoints.up("md")]: {
      float: "right",
    },
  },
  textfield: {
    width: 200,
  },
}))

const Searchbox: React.FC<{
  placeholder?: string
  onDebounce: (search: string) => void
}> = ({ placeholder, onDebounce }) => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDirty, setIsDirty] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.target.reset()
    e.target.focus()
  }

  useEffect(() => {
    if (!debouncedSearchTerm && !isDirty) return
    onDebounce(debouncedSearchTerm)
    setIsDirty(true)
  }, [debouncedSearchTerm])

  return (
    <CustomTextField
      onChange={handleChange}
      style={{ width: 200 }}
      placeholder={
        placeholder !== undefined ? placeholder : t("Enter your query")
      }
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleSubmit}>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default Searchbox
