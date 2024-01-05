import { PaletteOptions, colors } from "@mui/material"

const darkGrey = "#424242"
const offBlack = "#0e1111"
const softBlack = "#383838"
const black = "#000"

const offWhite = "#FAF9F6"
const softWhite = "#FEFEFE"
const white = "#FFF"

export const darkTheme = {
  mode: "dark",
  primary: {
    contrastText: offWhite,
    dark: colors.indigo[600],
    main: colors.indigo[400],
    light: colors.indigo[200],
  },
  secondary: {
    contrastText: offWhite,
    dark: colors.blue[700],
    main: colors.blue.A400,
    light: colors.blue.A200,
  },
  error: {
    contrastText: offWhite,
    dark: colors.red[700],
    main: colors.red[500],
    light: colors.red[300],
  },
  text: {
    primary: offWhite,
    secondary: colors.grey[100],
    disabled: colors.grey[600],
  },
  background: {
    default: darkGrey,
    paper: softBlack,
  },
  // divider: colors.grey[600],
} satisfies PaletteOptions

export const lightTheme: PaletteOptions = {
  mode: "light",
  primary: {
    contrastText: offWhite,
    dark: colors.indigo[800],
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
  },
  background: {
    default: softWhite,
    paper: offWhite,
  },
  divider: colors.grey[900],
} satisfies PaletteOptions
