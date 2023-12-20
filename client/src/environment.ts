export const APP_ENV = import.meta.env.VITE_APP_ENV
export const APP_PUBLIC_URL = import.meta.env.VITE_APP_PUBLIC_URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const LOG_LEVEL = APP_ENV === "production" ? "error" : "debug"
