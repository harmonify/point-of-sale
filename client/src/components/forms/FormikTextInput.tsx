import { makeStyles, TextField, TextFieldProps } from "@material-ui/core"
import classNames from "classnames"
import { useField } from "formik"
import React, { HTMLInputTypeAttribute, useRef } from "react"

const useStyles = makeStyles((theme) => ({
  fieldDynamicWidth: {
    [theme.breakpoints.up("xs")]: {
      width: 250,
    },
    [theme.breakpoints.up("sm")]: {
      width: 300,
    },
    [theme.breakpoints.up("md")]: {
      width: 500,
    },
  },
}))

const FormikTextInput: React.FC<
  {
    label: string
    id?: string
    name: string
    fullWidth?: boolean
    type?: HTMLInputTypeAttribute
    placeholder?: string
  } & TextFieldProps
> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const classes = useStyles()
  // @ts-ignore
  const [field, meta] = useField(props)
  const inputRef = useRef<HTMLDivElement | null>(null)

  let clsName = undefined
  if (!props.fullWidth) {
    clsName = classes.fieldDynamicWidth
  }
  if (props.className) {
    clsName = classNames(clsName, props.className)
  }

  return (
    <TextField
      ref={inputRef}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      className={clsName}
      {...field}
      {...props}
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
