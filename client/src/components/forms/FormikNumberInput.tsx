import { useFormikContext } from "formik"
import React, { ChangeEventHandler, forwardRef, Ref, useMemo } from "react"
import { NumericFormat, NumericFormatProps } from "react-number-format"

import FormikTextInput from "./FormikTextInput"
import { IFormikTextInputProps } from "./FormikTextInput"
import {
  getLocaleConfig,
  IntlConfig,
  LocaleConfig,
} from "./utils/getLocaleConfig"

interface IChangeEvent {
  target: { name: string; value: string }
}

type INumberFormatCustomProps = {
  getInputRef: (instance: typeof NumericFormat | null) => void
  onChange?: (event: IChangeEvent) => void
  name: string
} & NumericFormatProps

const NumberFormatCustom = (props: INumberFormatCustomProps) => {
  const { getInputRef, onChange, name, ...rest } = props

  return (
    <NumericFormat
      {...rest}
      getInputRef={props.getInputRef}
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
  "getInputRef" | "onChange" | "size"
> &
  IFormikTextInputProps & {
    intlConfig?: IntlConfig
  }

const FormikNumberInput = (props: IFormikNumberInputProps) => {
  const localeConfig: LocaleConfig = useMemo(
    () =>
      props.intlConfig
        ? getLocaleConfig(props.intlConfig)
        : ({} as LocaleConfig),
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
          getInputRef: () => inputRef,
        } satisfies INumberFormatCustomProps,
      }}
    />
  )
}

export default FormikNumberInput
