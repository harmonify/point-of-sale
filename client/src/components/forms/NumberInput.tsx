import React, { ChangeEventHandler, forwardRef, Ref, useMemo } from "react"
import { NumericFormat, NumericFormatProps } from "react-number-format"

import { ITextInputProps } from "./TextInput"
import {
  getLocaleConfig,
  IntlConfig,
  LocaleConfig,
} from "./utils/getLocaleConfig"
import TextInput from "./TextInput"

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

type INumberInputProps = Omit<
  INumberFormatCustomProps,
  "getInputRef" | "onChange" | "size"
> &
  ITextInputProps & {
    intlConfig?: IntlConfig
  }

const NumberInput = (props: INumberInputProps) => {
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

  return (
    <TextInput
      {...rest}
      onChange={onChange}
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

export default NumberInput
