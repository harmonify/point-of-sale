import { createTheme } from "@material-ui/core"
import palette from "./palette"
import typography from "./typography"

export const theme = createTheme({
  direction: "ltr",
  palette,
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})
