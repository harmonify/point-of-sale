import currency from "currency.js"
import { t } from "i18next"

export const isValueExists = (object, keysToIgnore = []) => {
  const keys = Object.keys(object)
  const errors: Record<string, string> = {}

  const fn = (val) => {
    if (keysToIgnore.length === 0) return false

    for (let i = 0; i < keysToIgnore.length; i++) {
      const element = keysToIgnore[i]
      if (element === val) return true
    }
    return false
  }

  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx]
    const value = object[key]
    if ((!fn(key) && !value && value !== 0) || (!fn(key) && value === "")) {
      errors[key] = "Required field"
    }
  }

  return errors
}

export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Parse API error message from:
 * 1: `error.message`
 * 2: `error.data.message`
 * 3: `error:error` (+translated)
 * 4: `error:status` (+translated)
 * default: Fetch error
 */
export const parseApiErrorMessage = (error: any) => {
  return error
    ? error.message ||
        (error.data && error.data.message) ||
        t(`${error.error}` as any, { ns: "error" }) ||
        t(`${error.status}` as any, { ns: "error" })
    : t(`FETCH_ERROR`, { ns: "error" })
}

export const formatRupiah = (amount?: number) => {
  if (!amount) return "IDR -"
  return currency(amount, {
    symbol: "IDR",
    separator: ".",
    decimal: ",",
  }).format()
}
