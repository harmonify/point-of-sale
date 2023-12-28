import React, { Component } from "react"
import { withStyles } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import { Tab, Tabs } from "@material-ui/core"

class CustomTabs extends Component {
  state = {}

  renderTabItems = () =>
    this.props.items.map((i) => (
      <Tab
        key={i}
        classes={{ label: this.props.classes.tabItem }}
        label={i}
        className={this.props.classes.tabItem}
      />
    ))

  render() {
    const { classes, value, onChange } = this.props

    return (
      <AppBar position="static" className={classes.tab} color="default">
        <Tabs
          classes={{
            indicator: classes.indicator,
          }}
          value={value}
          onChange={onChange}
        >
          {this.renderTabItems()}
        </Tabs>
      </AppBar>
    )
  }
}

export default withStyles(
  (theme) => ({
    tab: {
      boxShadow: "none",
      border: "1px solid #e0e0e0",
    },
    tabItem: {
      // fontSize: "12px"
    },
    indicator: {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  { withTheme: true },
)(CustomTabs)
