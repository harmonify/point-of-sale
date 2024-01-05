export const APP_ENV: "development" | "test" | "staging" | "production" =
  import.meta.env.VITE_APP_ENV
export const APP_PUBLIC_URL = import.meta.env.VITE_APP_PUBLIC_URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const APP_NAME = "Toko Dinamis"
export const APP_DEFAULT_LANG = import.meta.env.VITE_APP_DEFAULT_LANG || "id"
export const APP_DEFAULT_CURRENCY =
  import.meta.env.VITE_APP_DEFAULT_CURRENCY || "IDR"

export const LOG_LEVEL = APP_ENV === "production" ? "error" : "debug"
