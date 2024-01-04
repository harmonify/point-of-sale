import React from "react"
import { CircularProgress } from "@mui/material"
import { makeStyles } from "@mui/styles"
import Overlay from "./Overlay"

const useStyles = makeStyles(() => ({
  loader: {
    position: "absolute",
    left: "50%",
    top: "25vh",
    zIndex: 102,
  },
}))

const CircularLoader: React.FC<{
  isLoading: boolean
  style?: React.CSSProperties
}> = ({ isLoading, style }) => {
  const classes = useStyles()

  if (isLoading === true) {
    return (
      <div>
        <CircularProgress size={50} className={classes.loader} style={style} />
        <Overlay />
      </div>
    )
  }

  return null
}

export default CircularLoader
