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
import { useAppSelector } from "@/app/hooks"
import { selectAuthCredentials } from "@/features/auth"

function Error404() {
  const classes = useStyles()
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const mobileDevice = useMediaQuery(theme.breakpoints.down("md"))

  const auth = useAppSelector(selectAuthCredentials)

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
          {t("Back", { ns: "action" })}
        </Button>
        <Button
          className={classes.button}
          color="primary"
          component={RouterLink}
          to={location}
          variant="outlined"
          startIcon={<Replay />}
        >
          {t("Reload", { ns: "action" })}
        </Button>
        <Button
          className={classes.button}
          color="primary"
          component={RouterLink}
          to={auth.accessToken ? "/" : "/login"}
          variant="outlined"
          startIcon={<Home />}
        >
          {auth.accessToken
            ? t("Back to Home", { ns: "action" })
            : t("Back to Login", { ns: "action" })}
        </Button>
      </Box>
    </Container>
  )
}

export default Error404
