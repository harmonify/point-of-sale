import FormikTextInput, {
  IFormikTextInputProps,
} from "@/components/forms/FormikTextInput"
import { useField, useFormikContext } from "formik"
import React, { forwardRef, useEffect } from "react"

import { DatePicker, DatePickerProps } from "@mui/x-date-pickers"
import { DATE_FORMAT } from "@/constants"
import TextInput, { ITextInputProps } from "./TextInput"
import { DateTime } from "luxon"

type IFormikDateInputProps<TDate = unknown> = DatePickerProps<TDate> &
  React.RefAttributes<HTMLDivElement> & {
    name: string
    helperText?: string
  }

const FormikDateInput = forwardRef<
  HTMLDivElement,
  IFormikDateInputProps<DateTime>
>((props, ref) => {
  const formik = useFormikContext()
  const helpers = formik.getFieldHelpers<string | DateTime | null>(props.name)
  const meta = formik.getFieldMeta<string | DateTime | null>(props.name)

  let errorText = props.helperText
  if (meta.touched && meta.error) {
    const errorMessage = meta.error.toString()
    if (errorMessage.includes("[object Object]")) {
      errorText = JSON.stringify(meta.error)
    } else {
      errorText = errorMessage
    }
  }

  const value =
    typeof meta.value === "string" ? DateTime.fromISO(meta.value) : meta.value

  return (
    <DatePicker
      format={DATE_FORMAT}
      {...props}
      onChange={(value) => {
        helpers.setValue(value)
      }}
      value={value}
      closeOnSelect={true} // TODO: fix this
      ref={ref}
      slots={{ textField: TextInput }}
      slotProps={{
        textField: {
          error: meta.touched && Boolean(meta.error),
          helperText: errorText || props.helperText,
          InputLabelProps: { shrink: true },
        },
      }}
    />
  )
})

export default FormikDateInput
