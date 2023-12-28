import { useFormikContext } from "formik"
import React, { ChangeEventHandler, forwardRef, Ref, useMemo } from "react"
import { NumericFormat, NumericFormatProps } from "react-number-format"

import FormikTextInput from "./FormikTextInput"
import { ITextInputProps } from "./TextInput"
import { getLocaleConfig, IntlConfig } from "./utils/getLocaleConfig"

interface IChangeEvent {
  target: { name: string; value: string }
}

type INumberFormatCustomProps = {
  inputRef: (instance: typeof NumericFormat | null) => void
  onChange?: (event: IChangeEvent) => void
  name: string
} & NumericFormatProps

const NumberFormatCustom = (props: INumberFormatCustomProps) => {
  const { inputRef, onChange, name, ...rest } = props

  return (
    <NumericFormat
      {...rest}
      getInputRef={props.inputRef}
      onValueChange={(values) => {
        if (!props.onChange) return
        props.onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        } satisfies IChangeEvent)
      }}
    />
  )
}

type IFormikNumberInputProps = Omit<
  INumberFormatCustomProps,
  "inputRef" | "onChange"
> &
  ITextInputProps & {
    intlConfig: IntlConfig
  }

const FormikNumberInput = (props: IFormikNumberInputProps) => {
  const localeConfig = useMemo(
    () => getLocaleConfig(props.intlConfig),
    [props.intlConfig],
  )
  const {
    thousandSeparator = localeConfig.groupSeparator,
    decimalSeparator = localeConfig.decimalSeparator,
    allowedDecimalSeparators,
    thousandsGroupStyle,
    decimalScale,
    fixedDecimalScale,
    allowNegative,
    allowLeadingZeros,
    suffix,
    prefix = localeConfig.currencySymbol,

    inputRef,
    onChange,
    intlConfig,

    ...rest
  } = props

  const { setFieldValue } = useFormikContext()

  const handleChange = (e: IChangeEvent) => {
    setFieldValue(props.name, parseFloat(e.target.value))
  }

  return (
    <FormikTextInput
      {...rest}
      onChange={handleChange}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
        // @ts-ignore
        inputProps: {
          name: props.name,
          thousandSeparator,
          decimalSeparator,
          allowedDecimalSeparators,
          thousandsGroupStyle,
          decimalScale,
          fixedDecimalScale,
          allowNegative,
          allowLeadingZeros,
          suffix,
          prefix,
          inputRef: () => inputRef,
        } satisfies INumberFormatCustomProps,
      }}
    />
  )
}

export default FormikNumberInput
