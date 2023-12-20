import { colors } from "@material-ui/core"
import { PaletteOptions } from "@material-ui/core/styles/createPalette"

const offBlack = "#0e1111"
const offWhite = "#FAF9F6"

export default {
  primary: {
    contrastText: offWhite,
    dark: colors.indigo[900],
    main: colors.indigo[500],
    light: colors.indigo[100],
  },
  secondary: {
    contrastText: offWhite,
    dark: colors.blue[900],
    main: colors.blue.A700,
    light: colors.blue.A400,
  },
  error: {
    contrastText: offWhite,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.indigo[900],
    secondary: colors.indigo[500],
    disabled: colors.blueGrey[500],
    hint: colors.indigo[600],
  },
  background: {
    default: offWhite,
    paper: offWhite,
  },
  divider: colors.grey[200],
  common: {
    black: offBlack,
    white: offWhite,
  },
} satisfies PaletteOptions
