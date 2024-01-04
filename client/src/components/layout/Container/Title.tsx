import React, { Fragment } from "react"
import Divider from "@mui/material/Divider"
import { Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"

// eslint-disable-next-line
const useStyles = makeStyles((theme) => ({
  title: {
    lineHeight: 1.1,
    margin: 0,
    paddingBottom: 8,
    fontSize: 18,
    fontWeight: 400,
    display: "inline-block",
    borderBottom: `3px solid ${theme.palette.grey}`,
  },
}))

const Title: React.FC<{ title: string }> = ({ title }) => {
  const classes = useStyles()
  return (
    <>
      <Typography className={classes.title}>{title}</Typography>
      <Divider />
    </>
  )
}

export default Title
