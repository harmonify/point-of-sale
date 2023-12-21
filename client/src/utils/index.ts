import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import currency from "currency.js"
import { t } from "i18next"
import { DateTime } from "luxon"

export const isValueExists = (
  object: Record<string, any>,
  keysToIgnore = [],
) => {
  const keys = Object.keys(object)
  const errors: Record<string, string> = {}

  const fn = (val: string) => {
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
  const defaultValue = t("An error occured", { ns: "error" })
  return (
    (error &&
      (error.message ||
        (error.data && error.data.message) ||
        (error.error && t(error.error, { ns: "error", defaultValue })) ||
        (error.status && t(error.status, { ns: "error", defaultValue })))) ||
    defaultValue
  )
}

export const formatRupiah = (
  amount?: number | null,
  fallbackValue: number | string = "0,00",
) => {
  if (!amount) return `IDR${fallbackValue}`
  return currency(amount, {
    symbol: "IDR",
    separator: ".",
    decimal: ",",
  }).format()
}

export const formatISOToLocale = (
  isoString?: string | null,
  fallbackValue: string = "-",
): string => {
  return isoString
    ? DateTime.fromISO(isoString).setLocale("id").toLocaleString({
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : fallbackValue
}

export const formatGender = (
  value?: "MALE" | "FEMALE" | "NOT_DEFINED" | string | null,
  fallbackValue: string = "-",
): string => {
  switch (value) {
    case "MALE":
      return t("Male")
    case "FEMALE":
      return t("Female")
    default:
      return fallbackValue
  }
}
