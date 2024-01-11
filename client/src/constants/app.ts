export const APP = {
  name: import.meta.env.VITE_APP_NAME,
  address: import.meta.env.VITE_APP_ADDRESS,
  city: import.meta.env.VITE_APP_CITY,
  zipCode: import.meta.env.VITE_APP_ZIP_CODE,
  phone: import.meta.env.VITE_APP_PHONE,
  defaultLang: import.meta.env.VITE_APP_DEFAULT_LANG || "id",
  defaultCurrency: import.meta.env.VITE_APP_DEFAULT_CURRENCY || "IDR",
}
