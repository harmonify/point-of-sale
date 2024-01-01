import { APP_DEFAULT_LANG } from "@/environment"
import currency from "currency.js"
import { t } from "i18next"
import { DateTime, FixedOffsetZone } from "luxon"

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
    ? DateTime.fromISO(isoString, { zone: "utc" })
        .setLocale(APP_DEFAULT_LANG)
        .setZone(FixedOffsetZone.instance(7 * 60))
        .toLocaleString({
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
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

export const sentenceCase = ({
  text,
  normalize = false,
}: {
  text: any
  normalize?: boolean
}): string => {
  if (!text) return text
  const stringifiedText: string =
    typeof text.toString === "function" ? text.toString() : text
  return (
    stringifiedText[0].toUpperCase() +
    (normalize
      ? stringifiedText.slice(1).toLowerCase()
      : stringifiedText.slice(1))
  )
}

/**
 * It currently do not handle nested object
 */
export const removeEmptyStrings = <T extends Record<string, any>>(
  obj: T,
): T => {
  const newObj = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== "") {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

export const nameInitials = (name: string) => {
  const MAX_INITIALS_LENGTH = 2
  const nameArr = name.split(" ")
  return nameArr
    .slice(0, Math.min(nameArr.length, MAX_INITIALS_LENGTH))
    .map((word) => {
      const trimmed = word.trimStart()
      return trimmed && trimmed[0] ? trimmed[0].toUpperCase() : ""
    })
    .join("")
}
