import { useState } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "./counterSlice"
import styles from "./Counter.module.css"
import { Box, Button, Paper, Typography } from "@mui/material"
import { Money, MoneyOff } from "@mui/icons-material"
import { makeStyles } from "@mui/styles"

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  row: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  sectionTitle: {
    margin: theme.spacing(4, 0),
  },
  sectionSubtitle: {
    margin: theme.spacing(3, 0),
  },
  button: {
    margin: theme.spacing(1),
  },
  typography: {
    margin: theme.spacing(2, 0),
  },
  // Add more styles for other Material-UI components as needed
}))

export function Counter() {
  const classes = useStyles()
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState("2")

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <Paper className={classes.row}>
        <div className={styles.row}>
          <button
            className={styles.button}
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
          <span className={styles.value}>{count}</span>
          <button
            className={styles.button}
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>
        <div className={styles.row}>
          <input
            className={styles.textbox}
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={() => dispatch(incrementByAmount(incrementValue))}
          >
            Add Amount
          </button>
          <button
            className={styles.asyncButton}
            onClick={() => dispatch(incrementAsync(incrementValue))}
          >
            Add Async
          </button>
          <button
            className={styles.button}
            onClick={() => dispatch(incrementIfOdd(incrementValue))}
          >
            Add If Odd
          </button>
        </div>
      </Paper>

      <Box className={classes.root}>
        <Typography className={classes.sectionTitle} variant="h1">
          ===Buttons===
        </Typography>

        <Typography className={classes.sectionSubtitle} variant="h2">
          === Button Colors
        </Typography>
        <Button className={classes.button} variant="contained" color="primary">
          Primary Button
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
        >
          Secondary Button
        </Button>
        <Button className={classes.button} variant="contained">
          Default Button
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled
        >
          Disabled Button
        </Button>

        <Typography className={classes.sectionSubtitle} variant="h2">
          === Button Variants
        </Typography>
        <Button className={classes.button} variant="contained">
          Contained Button
        </Button>
        <Button className={classes.button} variant="outlined">
          Outlined Button
        </Button>
        <Button className={classes.button} variant="text">
          Text Button
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          startIcon={<Money />}
          endIcon={<MoneyOff />}
        >
          Button with Icons
        </Button>

        <Typography className={classes.sectionTitle} variant="h1">
          ===Typography===
        </Typography>
        <Typography className={classes.sectionSubtitle} variant="h2">
          === Typography Colors
        </Typography>
        <Typography className={classes.typography} variant="h3" color="initial">
          Initial
        </Typography>
        <Typography className={classes.typography} variant="h3" color="primary">
          Primary
        </Typography>
        <Typography
          className={classes.typography}
          variant="h3"
          color="secondary"
        >
          Secondary
        </Typography>
        <Typography className={classes.typography} variant="h3" color="error">
          Error
        </Typography>
        <Typography
          className={classes.typography}
          variant="h3"
          color="textPrimary"
        >
          Text Primary
        </Typography>
        <Typography
          className={classes.typography}
          variant="h3"
          color="textSecondary"
        >
          Text Secondary
        </Typography>

        <Typography className={classes.sectionSubtitle} variant="h2">
          === Typography Variants
        </Typography>
        <Typography className={classes.typography} variant="h1">
          Heading 1
        </Typography>
        <Typography className={classes.typography} variant="h2">
          Heading 2
        </Typography>
        <Typography className={classes.typography} variant="h3">
          Heading 3
        </Typography>
        <Typography className={classes.typography} variant="h4">
          Heading 4
        </Typography>
        <Typography className={classes.typography} variant="h5">
          Heading 5
        </Typography>
        <Typography className={classes.typography} variant="h6">
          Heading 6
        </Typography>
        <Typography className={classes.typography} variant="subtitle1">
          Subtitle 1
        </Typography>
        <Typography className={classes.typography} variant="subtitle2">
          Subtitle 2
        </Typography>
        <Typography className={classes.typography} variant="body1">
          Body 1 (default)
        </Typography>
        <Typography className={classes.typography} variant="body2">
          Body 2
        </Typography>
        <Typography className={classes.typography} variant="caption">
          Caption
        </Typography>
        <br />
        <Typography className={classes.typography} variant="button">
          Button
        </Typography>

        {/* Add more Material-UI components and styles as needed */}
      </Box>
    </div>
  )
}

export default Counter
