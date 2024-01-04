import React, { ReactNode } from "react"
import { makeStyles, withStyles } from "@mui/styles"
import Title from "./Title"
import { Box } from "@mui/material"

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: "1px solid #3f50b5",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    position: "relative",
    flexGrow: 1,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}))

const Container: React.FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Title title={title} />
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default Container
