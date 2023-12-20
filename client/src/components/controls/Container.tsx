import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Title from "./Title"

const styles = () => ({
  root: {
    borderTop: "1px solid #3f50b5",
    padding: "10px 5px 5px 5px",
    position: "relative",
  },
})

const Container = ({ classes, title, children }) => (
  <div className={classes.root}>
    <Title title={title} />
    <br />
    <div>{children}</div>
  </div>
)

export default withStyles(styles, { withTheme: true })(Container)
