import { Grid, useTheme } from "@material-ui/core"
import React from "react"

import Cart from "./cart/Cart"
import ProductSection from "./productSection/ProductSection"

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
        md={6}
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
        md={6}
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
