import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, useTheme, useMediaQuery } from "@material-ui/core"
import TopBar from "src/layouts/Dashboard/TopBar"
import Page from "src/components/Page"
import Button from "src/components/Button"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F2F9FE",
    padding: theme.spacing(3),
    paddingTop: "10vh",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    height: "100vh",
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: 300,
    height: "auto",
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    textAlign: "center",
  },
  headline: {
    marginBottom: theme.spacing(2),
  },
  subHeadline: {
    marginBottom: theme.spacing(2),
  },
  btnRefresh: {
    padding: "8px 16px",
  },
}))

function UnderMaintenance(props) {
  const classes = useStyles()
  const theme = useTheme()

  const { history } = props

  const underMaintenance = useSelector(
    (state) => state?.featureFlag?.underMaintenance?.isActive,
  )
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    if (!underMaintenance) {
      history.push("/")
    }
  }, [])

  return (
    <Page className={classes.root} title="Under Maintenance">
      <TopBar nonAuth />

      <div className={classes.imageContainer}>
        <img
          alt="Under development"
          className={classes.image}
          src="/images/under-maintenance.png"
        />
      </div>
      <div className={classes.buttonContainer}>
        <Typography
          className={classes.headline}
          align="center"
          variant={mobileDevice ? "h4" : "h1"}
        >
          POS is currently under maintenance.
        </Typography>
        <Typography
          className={classes.subHeadline}
          align="center"
          variant="subtitle2"
        >
          We will be back soon. Thank you for the patience.
        </Typography>
        <Button
          id="refresh_button"
          color="secondary"
          size="large"
          variant="contained"
          onClick={() => history.push("/")}
        >
          Try to Refresh
        </Button>
      </div>
    </Page>
  )
}

UnderMaintenance.propTypes = {
  history: PropTypes.object,
}

export default UnderMaintenance
