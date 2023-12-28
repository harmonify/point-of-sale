import FormikTextInput from "@/components/forms/FormikTextInput"
import { useFormikContext } from "formik"
import React from "react"

import { ITextInputProps } from "./TextInput"

/** If true, will add a default value in the beginning */
type SelectDefaultValue =
  | {
      enableDefaultValue?: undefined
    }
  | {
      enableDefaultValue: false
    }
  | {
      enableDefaultValue: true
      defaultLabel?: string
      defaultValue?: string | number
    }

type IFormikSelectInputProps = SelectDefaultValue & {
  options: {
    label: string
    value: string | number
  }[]
} & ITextInputProps

const FormikSelectInput: React.FC<IFormikSelectInputProps> = (props) => {
  const {
    enableDefaultValue,
    defaultValue,
    // @ts-ignore
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
      SelectProps={{
        native: true,
        variant: props.variant || "outlined",
      }}
      onChange={(e) => {
        setFieldValue(
          props.name,
          props.type === "number" ? parseInt(e.target.value) : e.target.value,
        )
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
