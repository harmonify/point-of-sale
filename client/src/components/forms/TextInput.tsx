import { TextField, TextFieldProps } from "@mui/material"
import React, { HTMLInputTypeAttribute, forwardRef, useRef } from "react"

export type ITextInputProps = {
  label?: string
  id?: string
  name: string
  /** default: `true` */
  fullWidth?: boolean
  type?: HTMLInputTypeAttribute
  placeholder?: string
} & TextFieldProps

const TextInput = forwardRef<HTMLDivElement, ITextInputProps>((props, ref) => {
  return (
    <TextField
      ref={ref}
      {...props}
      label={props.label ? props.label.toString() : undefined}
      variant={props.variant || "outlined"}
      fullWidth={typeof props.fullWidth === "boolean" ? props.fullWidth : true}
      InputLabelProps={{
        htmlFor: props.id || props.name,
        ...props.InputLabelProps,
      }}
      type={props.type || "text"}
      margin={props.margin || "normal"}
    />
  )
})

export default TextInput
