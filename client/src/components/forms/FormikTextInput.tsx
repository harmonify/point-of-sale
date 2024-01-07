import { useField } from "formik"
import React from "react"

import TextInput, { ITextInputProps } from "./TextInput"

export type IFormikTextInputProps = ITextInputProps & {
  /** decide whether to disable error text */
  disableErrorText?: boolean
}

const FormikTextInput: React.FC<IFormikTextInputProps> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  // @ts-ignore
  const [field, meta] = useField(props)

  let errorText = props.helperText
  if (meta.touched && meta.error) {
    const errorMessage = meta.error.toString()
    if (errorMessage.includes("[object Object]")) {
      errorText = JSON.stringify(meta.error)
    } else {
      errorText = errorMessage
    }
  }

  return (
    <TextInput
      {...props}
      {...field}
      onChange={(e) => {
        field.onChange(e)
        if (typeof props.onChange === "function") {
          props.onChange(e)
        }
      }}
      onBlur={(e) => {
        field.onBlur(e)
        if (typeof props.onBlur === "function") {
          props.onBlur(e)
        }
      }}
      error={meta.touched && Boolean(meta.error)}
      helperText={props.disableErrorText ? props.helperText : errorText}
      InputLabelProps={{
        shrink: !!field.value,
        ...props.InputLabelProps,
      }}
    />
  )
}

export default FormikTextInput
