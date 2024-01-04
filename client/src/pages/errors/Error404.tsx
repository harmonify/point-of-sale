import { SvgIcons } from "@/assets"
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Home, KeyboardBackspace, Replay } from "@mui/icons-material"
import { t } from "i18next"
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom"

import useStyles from "./styles"

function Error404() {
  const classes = useStyles()
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'))

  const title = t("Page not found", { ns: "error" })

  return (
    <Container className={classes.root} title="Error 404">
      <Typography align="center" variant={mobileDevice ? "h4" : "h1"}>
        404: {title}
      </Typography>
      <Typography align="center" variant="subtitle2">
        {t(
          "You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation",
          { ns: "error" },
        )}
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt={title}
          className={classes.image}
          src={SvgIcons.PageNotFoundImage}
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
          {t("Reload")}
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
