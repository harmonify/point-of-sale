import FormikTextInput from "@/components/forms/FormikTextInput"
import { useFormikContext } from "formik"
import React, { useEffect } from "react"

import { IFormikTextInputProps } from "./FormikTextInput"
import { isNumeric } from "@/utils/number"

/** If true, will add a default value in the beginning */
type SelectDefaultValue = {
  enableEmptyValue?: boolean
  emptyValueLabel?: string
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
    enableEmptyValue,
    defaultValue,
    emptyValueLabel,
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
        const value =
          props.type === "number"
            ? isNumeric(e.target.value)
              ? parseInt(e.target.value)
              : null
            : e.target.value
        setFieldValue(props.name, value)
        if (props.onChange) {
          props.onChange(e)
        }
      }}
    >
      {enableEmptyValue ? (
        <option aria-label={emptyValueLabel || "None"}>
          {emptyValueLabel || ""}
        </option>
      ) : null}
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
