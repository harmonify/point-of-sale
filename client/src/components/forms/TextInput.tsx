import { makeStyles, TextField, TextFieldProps } from "@material-ui/core"
import classNames from "classnames"
import { useField } from "formik"
import React, { HTMLInputTypeAttribute, useRef } from "react"

const useStyles = makeStyles((theme) => ({
  textField: {
    // [theme.breakpoints.up("xs")]: {
    //   width: 250,
    // },
    // [theme.breakpoints.up("sm")]: {
    //   width: 300,
    // },
    // [theme.breakpoints.up("md")]: {
    //   width: 500,
    // },
    // marginRight: 10,
  },
  textFieldFormLabel: {
    // fontSize: "1.05rem",
  },
}))

const TextInput: React.FC<
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

  let clsName = classes.textField
  if (props.className) {
    clsName = classNames(classes.textField, props.className)
  }

  return (
    <TextField
      {...field}
      {...props}
      ref={inputRef}
      type={props.type || "text"}
      margin={props.margin || "normal"}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
        htmlFor: props.id || props.name,
        className: classes.textFieldFormLabel,
      }}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  )
}

export default TextInput
