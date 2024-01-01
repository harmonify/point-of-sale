import { Box, Button, Grid } from "@material-ui/core"
import React, { Component, useState } from "react"

import NormalSale from "../productSection/sale/NormalSale"

const CartFooter: React.FC = (props) => {
  const [showNormalPopup, setNormalPopup] = useState(false)

  const normalSaleClick = () => {
    setNormalPopup(true)
  }

  const handleNormalSaleClose = () => {
    setNormalPopup(false)
  }

  return (
    <Grid>
      {showNormalPopup && (
        <NormalSale
          open={showNormalPopup}
          handleClose={handleNormalSaleClose}
        />
      )}
      <Button
        variant="contained"
        color="default"
        fullWidth
        onClick={normalSaleClick}
      >
        Normal Sale
      </Button>
    </Grid>
  )
}

export default CartFooter
