import React, { ReactNode } from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Title from "./Title"
import { Box } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: "1px solid #3f50b5",
    padding: "10px 5px 5px 5px",
    position: "relative",
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
