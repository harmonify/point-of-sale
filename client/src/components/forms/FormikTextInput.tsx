import { useField } from "formik"
import React from "react"

import TextInput, { ITextInputProps } from "./TextInput"

const FormikTextInput: React.FC<ITextInputProps> = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  // @ts-ignore
  const [field, meta] = useField(props)

  let helperText = props.helperText
  if (meta.touched && meta.error) {
    const errorMessage = meta.error.toString()
    if (errorMessage.includes("[object Object]")) {
      helperText = JSON.stringify(meta.error)
    } else {
      helperText = errorMessage
    }
  }

  return (
    <TextInput
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={helperText}
      InputLabelProps={{
        shrink: !!field.value,
      }}
    />
  )
}

export default FormikTextInput
