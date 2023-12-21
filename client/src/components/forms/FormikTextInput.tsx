import { TextField, TextFieldProps } from "@material-ui/core"
import { useField } from "formik"
import React, { HTMLInputTypeAttribute, useRef } from "react"

const FormikTextInput: React.FC<
  {
    label: string
    id?: string
    name: string
    /** default: `true` */
    fullWidth?: boolean
    type?: HTMLInputTypeAttribute
    placeholder?: string
  } & TextFieldProps
> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  // @ts-ignore
  const [field, meta] = useField(props)
  const inputRef = useRef<HTMLDivElement | null>(null)

  return (
    <TextField
      ref={inputRef}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...field}
      {...props}
      fullWidth={typeof props.fullWidth === "boolean" ? props.fullWidth : true}
      InputLabelProps={{
        htmlFor: props.id || props.name,
        ...props.InputLabelProps,
      }}
      type={props.type || "text"}
      margin={props.margin || "normal"}
    />
  )
}

export default FormikTextInput
