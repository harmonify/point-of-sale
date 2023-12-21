import FormikTextInput, {
  IFormikTextInputProps,
} from "@/components/forms/FormikTextInput"
import React from "react"

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

const FormikSelectInput: React.FC<
  SelectDefaultValue & {
    options: {
      label: string
      value: string | number
    }[]
  } & IFormikTextInputProps
> = (props) => {
  return (
    <FormikTextInput
      {...props}
      select
      SelectProps={{
        native: true,
      }}
    >
      {props.enableDefaultValue && (
        <option
          aria-label={props.defaultLabel || "None"}
          value={props.defaultValue}
        >
          {props.defaultLabel || ""}
        </option>
      )}
      {props.options.map((option) => {
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
