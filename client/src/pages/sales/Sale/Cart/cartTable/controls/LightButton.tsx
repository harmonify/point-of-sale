import React from "react"
import { Button, ButtonProps, Typography } from "@mui/material"

const LightButton: React.FC<
  {
    text: string | React.ReactNode
    onClick: React.MouseEventHandler
  } & ButtonProps
> = ({ text, ...props }) => (
  <Button
    {...props}
    onClick={props.onClick}
    style={{
      textTransform: "none",
      textAlign: "inherit",
      padding: 0,
    }}
  >
    <Typography
      variant="h6"
      style={{
        width: "100%",
        overflowWrap: "break-word",
      }}
    >
      {text}
    </Typography>
  </Button>
)

export default LightButton
