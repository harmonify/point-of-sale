import { APP } from "@/constants"
import currency from "currency.js"
import { t } from "i18next"
import { DateTime, DateTimeFormatOptions, FixedOffsetZone } from "luxon"
import { isNumber } from "./number"

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

interface IFormatRupiahOptions {
  fallbackValue?: any
  precision?: number
}

export const formatRupiah = (
  amount?: number | null,
  options?: IFormatRupiahOptions,
) => {
  const finalOptions = {
    fallbackValue: "0",
    precision: 2,
    ...options,
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: finalOptions.precision,
    minimumFractionDigits: 0,
  }).format(isNumber(amount) ? amount : finalOptions.fallbackValue)
}

export const formatISOToISODate = (
  isoString?: string | null,
  fallbackValue: string = "-",
): string | null => {
  return isoString
    ? DateTime.fromISO(isoString, { zone: "utc" })
        .setLocale(APP.defaultLang)
        .setZone(FixedOffsetZone.instance(7 * 60)) // TODO: hardcoded
        .toISODate()
    : fallbackValue
}

export const formatDateTimeToLocaleDate = (
  dateTime: DateTime,
  options?: DateTimeFormatOptions,
): string => {
  return dateTime
    .setLocale(APP.defaultLang)
    .setZone(FixedOffsetZone.instance(7 * 60)) // TODO: hardcoded
    .toLocaleString({
      day: "numeric",
      month: "long",
      year: "numeric",
      ...options,
    })
}

export const formatDateTimeToLocale = (
  dateTime: DateTime,
  options?: DateTimeFormatOptions,
): string => {
  return dateTime
    .setLocale(APP.defaultLang)
    .setZone(FixedOffsetZone.instance(7 * 60)) // TODO: hardcoded
    .toLocaleString({
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      ...options,
    })
}

export const formatISOToLocale = (
  isoString?: string | null,
  fallbackValue: string = "-",
): string => {
  return isoString
    ? formatDateTimeToLocale(DateTime.fromISO(isoString, { zone: "utc" }))
    : fallbackValue
}

export const formatISOToLocaleDate = (
  isoString?: string | null,
  fallbackValue: string = "-",
): string => {
  return isoString
    ? formatDateTimeToLocaleDate(DateTime.fromISO(isoString, { zone: "utc" }))
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

export const unslugify = (text?: string | null): string => {
  return text ? text.replaceAll("-", " ") : (text as string)
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

export const nameInitials = (name?: string) => {
  if (!name || typeof name !== "string") return name
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

export const truncate = (text: string, maxLength: number = 60) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
}

export const generateId = () => {
  try {
    return crypto.randomUUID()
  } catch (error) {
    return Math.random().toString(36)
  }
}
