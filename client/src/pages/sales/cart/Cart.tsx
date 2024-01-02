import { nameInitials } from "@/utils"
import { Avatar, Box, Grid, Paper, Typography } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import React from "react"
import CartFooter from "./CartFooter"
import CartTable from "./cartTable/CartTable"

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: "#fff",
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: theme.spacing(3),
    backgroundColor: theme.palette.primary.dark,
  },
}))

const Cart: React.FC = (props) => {
  const classes = useStyles()

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CartTable />
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <CartFooter />
      </Grid>
      <Grid item xs={12} container spacing={1} alignItems="center">
        <Grid item>
          <Avatar alt="Britania Tiger" className={classes.avatar}>
            {nameInitials("Britania Tiger")}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h5">Britania Tiger</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Cart
