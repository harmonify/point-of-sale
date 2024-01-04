import { TableCell } from "@mui/material"
import { withStyles } from "@mui/styles"

const CustomTableCell = withStyles(
  (theme) => ({
    head: {
      padding: theme.spacing(1),
      fontSize: "14px",
      lineHeight: "18px",
    },
    body: {
      padding: theme.spacing(1),
      width: 150,
      overflowWrap: "break-word",
      fontSize: "14px",
    },
    footer: {
      padding: theme.spacing(1),
      fontSize: "104px",
    },
  }),
  { withTheme: true },
)(TableCell)

export default CustomTableCell
