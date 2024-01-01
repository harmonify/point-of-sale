import { Grid, useTheme } from "@material-ui/core"
import React from "react"

import Cart from "./cart/Cart"
import ProductSection from "./productSection/ProductSection"

const Sale: React.FC = (props) => {
  const theme = useTheme()

  return (
    <Grid container spacing={2} style={{ padding: theme.spacing(2) }}>
      {/* Left side display cart */}
      <Grid item xs={12} md={6}>
        <Cart />
      </Grid>
      {/* Right side display barcode/search box and grid of products */}
      <Grid item xs={12} md={6}>
        <ProductSection />
      </Grid>
    </Grid>
  )
}

export default Sale
