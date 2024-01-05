import { ThemeOptions } from "@mui/material"
import { darkTheme, lightTheme } from "./palette"
import { typography } from "./typography"

export const getThemeToken = ({ darkMode }: { darkMode: boolean }) =>
  ({
    direction: "ltr",
    palette: darkMode ? darkTheme : lightTheme,
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
  } satisfies ThemeOptions)
