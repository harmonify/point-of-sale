import { colors } from "@mui/material"
import { PaletteOptions } from "@mui/styles/createPalette"

const darkGrey = "#424242"
const offBlack = "#0e1111"
const offWhite = "#FAF9F6"
const softBlack = "#303030"
const white = "#FFF"
const softWhite = "#FEFEFE"

export const darkTheme = {
  type: "dark",
  primary: {
    contrastText: offWhite,
    dark: colors.indigo[900],
    main: colors.indigo[500],
    light: colors.indigo[100],
  },
  secondary: {
    contrastText: offWhite,
    dark: colors.blue[900],
    main: colors.blue.A400,
    light: colors.blue.A200,
  },
  error: {
    contrastText: offWhite,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: offWhite,
    secondary: colors.grey[100],
    disabled: colors.grey[600],
    hint: colors.grey[500],
  },
  background: {
    default: darkGrey,
    paper: softBlack,
  },
  // divider: colors.grey[600],
  common: {
    black: offBlack,
    white: offWhite,
  },
} satisfies PaletteOptions

export const lightTheme: PaletteOptions = {
  type: "light",
  primary: {
    contrastText: offWhite,
    dark: colors.indigo[900],
    main: colors.indigo[500],
    light: colors.indigo[100],
  },
  secondary: {
    contrastText: offWhite,
    dark: colors.blue[900],
    main: colors.blue.A400,
    light: colors.blue.A200,
  },
  error: {
    contrastText: offWhite,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.indigo[900],
    secondary: offBlack,
    disabled: colors.grey[500],
    hint: colors.indigo[600],
  },
  background: {
    default: white,
    paper: softWhite,
  },
  divider: colors.grey[900],
  common: {
    black: offBlack,
    white: offWhite,
  },
} satisfies PaletteOptions
