import FormikTextInput from "@/components/forms/FormikTextInput"
import { useFormikContext } from "formik"
import React, { useEffect } from "react"

import { IFormikTextInputProps } from "./FormikTextInput"

/** If true, will add a default value in the beginning */
type SelectDefaultValue = {
  enableDefaultValue?: boolean
  defaultLabel?: string
  defaultValue?: string | number
}

type IFormikSelectInputProps = SelectDefaultValue & {
  options: {
    label: string
    value: string | number | undefined
  }[]
} & IFormikTextInputProps

const FormikSelectInput: React.FC<IFormikSelectInputProps> = (props) => {
  const {
    enableDefaultValue,
    defaultValue,
    defaultLabel,
    options,
    ...textInputProps
  } = props

  const { setFieldValue } = useFormikContext()

  return (
    <FormikTextInput
      {...textInputProps}
      defaultValue={defaultValue}
      select
      InputLabelProps={{ shrink: true, ...textInputProps.InputLabelProps }}
      SelectProps={{
        native: true,
        variant: props.variant || "outlined",
        ...textInputProps.SelectProps,
      }}
      onChange={(e) => {
        setFieldValue(
          props.name,
          props.type === "number" ? parseInt(e.target.value) : e.target.value,
        )
        if (props.onChange) {
          props.onChange(e)
        }
      }}
    >
      {enableDefaultValue && (
        <option aria-label={defaultLabel || "None"} value={defaultValue}>
          {defaultLabel || ""}
        </option>
      )}
      {options.map((option) => {
        return (
          <option key={option.value || option.label} value={option.value}>
            {option.label}
          </option>
        )
      })}
    </FormikTextInput>
  )
}

export default FormikSelectInput
