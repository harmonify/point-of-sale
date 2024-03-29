import { Palette } from "@mui/material"
import { TypographyOptions } from "@mui/material/styles/createTypography"

export const typography = (palette: Palette): TypographyOptions => ({
  h1: {
    color: palette!.text!.primary,
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "36px",
    letterSpacing: "-0.24px",
    lineHeight: "40px",
  },
  h2: {
    color: palette!.text!.primary,
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "32px",
    letterSpacing: "-0.24px",
    lineHeight: "32px",
  },
  h3: {
    color: palette!.text!.primary,
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "28px",
    letterSpacing: "-0.06px",
    lineHeight: "28px",
  },
  h4: {
    color: palette!.text!.primary,
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "24px",
    letterSpacing: "-0.06px",
    lineHeight: "24px",
  },
  h5: {
    color: palette!.text!.primary,
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "20px",
    letterSpacing: "-0.05px",
    lineHeight: "20px",
  },
  h6: {
    color: palette!.text!.primary,
    fontWeight: 600,
    fontFamily: "Roboto",
    fontSize: "16px",
    letterSpacing: "-0.05px",
    lineHeight: "20px",
  },
  subtitle1: {
    fontFamily: "Roboto",
    fontWeight: 400,
    color: palette!.text!.primary,
    fontSize: "16px",
    letterSpacing: "-0.05px",
    lineHeight: "25px",
  },
  subtitle2: {
    color: palette!.text!.secondary,
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "14px",
    letterSpacing: "-0.05px",
    lineHeight: "21px",
  },
  body1: {
    color: palette!.text!.primary,
    fontFamily: "Roboto",
    fontSize: "16px",
    letterSpacing: "-0.05px",
    lineHeight: "18px",
  },
  body2: {
    color: palette!.text!.secondary,
    fontFamily: "Roboto",
    fontSize: "14px",
    letterSpacing: "-0.04px",
    lineHeight: "18px",
  },
  button: {
    fontFamily: "Roboto",
    fontWeight: 600,
    color: palette!.text!.primary,
    fontSize: "16px",
  },
  caption: {
    color: palette!.text!.secondary,
    fontSize: "14px",
    fontFamily: "Roboto",
    letterSpacing: "0.33px",
    lineHeight: "13px",
  },
  overline: {
    color: palette!.text!.secondary,
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Roboto",
    letterSpacing: "0.33px",
    lineHeight: "14px",
    textTransform: "uppercase",
  },
})
