import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import currency from "currency.js"
import { t } from "i18next"
import { DateTime } from "luxon"
import { ArraySchema, Flags } from "yup"

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
 * Parse and translate API error message from:
 * 1: `error.message`
 * 2: `error.data.message`
 * 3: `error:error`
 * 4: `error:status`
 * default: Fetch error
 */
export const parseApiErrorMessage = (error: any) => {
  const defaultValue = t("An error occured", { ns: "error" })
  return error
    ? (error.message && t(error.message, { ns: "error" })) ||
        (error.data &&
          error.data.message &&
          t(error.data.message, { ns: "error" })) ||
        (error.error && t(error.error, { ns: "error", defaultValue })) ||
        (error.status && t(error.status, { ns: "error", defaultValue }))
    : defaultValue
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

export const differenceBy = <T, K>(
  array1: T[],
  array2: T[],
  iteratee: (item: T) => K,
): T[] => {
  const set2 = new Set(array2.map(iteratee))
  return array1.filter((item) => !set2.has(iteratee(item)))
}

export const yupTestUnique = <
  TIn extends any[] | null | undefined,
  TContext,
  TDefault,
  TFlags extends Flags,
>(params: {
  arraySchema: ArraySchema<TIn, TContext, TDefault, TFlags>
  iteratee?: (
    value: TIn extends readonly (infer ElementType)[] ? ElementType : never,
  ) => any
  message?: string
}) => {
  return params.arraySchema.test(
    "unique",
    params.message ? params.message : t("array.unique", { ns: "validation" }),
    (values, context) => {
      return values?.length
        ? new Set(
            values.map((value) =>
              typeof params.iteratee === "function"
                ? params.iteratee(value)
                : value,
            ),
          ).size === values.length
        : true
    },
  )
}
