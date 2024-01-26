import { Grid, useMediaQuery, useTheme } from "@mui/material"
import React from "react"

import Cart from "./Cart/Cart"
import ProductSection from "./ProductSection/ProductSection"

const SaleCashierView: React.FC = (props) => {
  const theme = useTheme()
  const isMobileDevice = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Grid
      container
      spacing={2}
      direction={isMobileDevice ? "row" : "row-reverse"}
      style={{
        padding: theme.spacing(2),
        // backgroundColor: theme.palette.warning["dark"], // DEBUG
        height: "100%",
      }}
    >
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
    </Grid>
  )
}

export default SaleCashierView
