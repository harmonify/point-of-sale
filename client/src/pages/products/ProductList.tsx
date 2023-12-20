import React, { Component, useEffect, useState } from "react"

import { makeStyles, withStyles } from "@material-ui/core/styles"
import CustomTabs from "../../components/controls/Tabs"
import TabContainer from "../../components/controls/TabContainer"
import ProductTab from "./ProductTab"
import ProductTypeTab from "./ProductTypeTab"
import { useLocation, useNavigate } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  tabHolder: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    boxShadow: "none",
  },
  tabItem: {
    fontSize: "12px",
  },
  indicator: {
    backgroundColor: "#3f51b5",
  },
}))

const Products = () => {
  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()

  const [value, setValue] = useState(0)

  useEffect(() => {
    if (location.pathname === "/products") {
      setValue(0)
    } else {
      setValue(1)
    }
  }, [])

  const handleChange = (event, value) => {
    if (value === 0) {
      return navigate("/products")
    } else {
      return navigate("/producttypes")
    }
    setValue(value)
  }

  return (
    <div>
      <div className={classes.tabHolder}>
        <CustomTabs
          onChange={handleChange}
          value={value}
          items={["Products", "Product Types"]}
        />
        {value === 0 && (
          <TabContainer>
            <ProductTab />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <ProductTypeTab />
          </TabContainer>
        )}
      </div>
    </div>
  )
}

export default Products
