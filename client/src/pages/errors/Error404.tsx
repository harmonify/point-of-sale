import { SvgIcons } from "@/assets"
import {
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"

import useStyles from "./styles"

function Error404() {
  const classes = useStyles()
  const theme = useTheme()
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Container className={classes.root} title="Error 404">
      <Typography align="center" variant={mobileDevice ? "h4" : "h1"}>
        404: The page you are looking for isn’t here
      </Typography>
      <Typography align="center" variant="subtitle2">
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Under development"
          className={classes.image}
          src={SvgIcons.PageNotFoundImage}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          component={RouterLink}
          to="/"
          variant="outlined"
        >
          Back to home
        </Button>
      </div>
    </Container>
  )
}

export default Error404
