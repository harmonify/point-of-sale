import { SvgIcons } from "@/assets"
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import { Home, KeyboardBackspace, Replay } from "@material-ui/icons"
import { t } from "i18next"
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom"

import useStyles from "./styles"

function Error404() {
  const classes = useStyles()
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"))

  const subtitle = t("An error occured", { ns: "error" })

  return (
    <Container className={classes.root} title="Error 404">
      <Typography align="center" variant={mobileDevice ? "h4" : "h1"}>
        500: {t("Ooops", { ns: "error" })}
      </Typography>
      <Typography align="center" variant="subtitle2">
        {subtitle}
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt={subtitle}
          className={classes.image}
          src={SvgIcons.PageError500Image}
        />
      </div>
      <Box className={classes.buttonContainer}>
        <Button
          className={classes.button}
          color="primary"
          onClick={() => navigate(-1)}
          variant="outlined"
          startIcon={<KeyboardBackspace />}
        >
          {t("Back")}
        </Button>
        <Button
          className={classes.button}
          color="primary"
          component={RouterLink}
          to={location}
          variant="outlined"
          startIcon={<Replay />}
        >
          {t("Retry")}
        </Button>
        <Button
          className={classes.button}
          color="primary"
          component={RouterLink}
          to="/"
          variant="outlined"
          startIcon={<Home />}
        >
          {t("Back to Home")}
        </Button>
      </Box>
    </Container>
  )
}

export default Error404
