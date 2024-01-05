import { Grid, useTheme } from "@mui/material"
import React from "react"

import Cart from "./Cart/Cart"
import ProductSection from "./ProductSection/ProductSection"

const Sale: React.FC = (props) => {
  const theme = useTheme()

  return (
    <Grid
      container
      spacing={2}
      style={{
        padding: theme.spacing(2),
        // backgroundColor: theme.palette.warning["dark"], // DEBUG
        height: "100%",
      }}
    >
      {/* Left side display cart */}
      <Grid
        item
        xs={12}
        md={7}
        style={{
          height: "100%",
          // backgroundColor: theme.palette.success["light"], // DEBUG
        }}
      >
        <Cart />
      </Grid>
      {/* Right side display barcode/search box and grid of products */}
      <Grid
        item
        xs={12}
        md={5}
        style={{
          minHeight: "100%",
          // backgroundColor: theme.palette.warning["light"], // DEBUG
          paddingBottom: 0,
        }}
      >
        <ProductSection />
      </Grid>
    </Grid>
  )
}

export default Sale
