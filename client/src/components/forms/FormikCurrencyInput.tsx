import { APP_DEFAULT_CURRENCY, APP_DEFAULT_LANG } from "@/environment"
import React, { forwardRef, useState } from "react"
import CurrencyInput, {
  CurrencyInputProps,
  formatValue,
} from "react-currency-input-field"

import FormikTextInput from "./FormikTextInput"
import { ITextInputProps } from "./TextInput"

export const FormikCurrencyInput = forwardRef<
  HTMLInputElement,
  CurrencyInputProps & ITextInputProps
>((props, ref) => {
  const defaultValue = "0"
  const [value, setValue] = useState<string>(defaultValue)
  const formattedValue = formatValue({
    value: value,
    intlConfig: { locale: "id", currency: "IDR" },
  })

  return (
    <CurrencyInput
      ref={ref}
      defaultValue={defaultValue}
      value={formattedValue}
      customInput={() => (
        <FormikTextInput
          {...props}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      intlConfig={{
        locale: APP_DEFAULT_LANG,
        currency: APP_DEFAULT_CURRENCY,
      }}
    />
  )
})
