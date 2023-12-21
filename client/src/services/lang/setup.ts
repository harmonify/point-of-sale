import i18n, { t } from "i18next"
import { initReactI18next } from "react-i18next"

import { defaultNS, idResource } from "."
import { setLocale } from "yup"

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS,
    resources: {
      id: idResource,
    },
    lng: "id", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

i18n.services.formatter?.addCached("titlecase", () => (value) => {
  if (!value) return value
  const normalized: string = value.toString ? value.toString() : value
  return normalized
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")
})

i18n.services.formatter?.addCached("sentencecase", () => (value) => {
  if (!value) return value
  const normalized: string = value.toString ? value.toString() : value
  return normalized[0].toUpperCase() + normalized.slice(1)
})

i18n.services.formatter?.addCached("spaceBeforeWhenDefined", () => (value) => {
  return value ? " " + value : value
})

i18n.services.formatter?.addCached("default", (lng, options) => (value) => {
  return value ? value : options.value
})

setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: "validationError.field_invalid",
  },
  // use functions to generate an error object that includes the value from the schema
  number: {
    min: ({ min }) => ({
      key: "validationError.field_too_short",
      values: { min },
    }),
    max: ({ max }) => ({
      key: "validationError.field_too_big",
      values: { max },
    }),
  },
  string: {
    email: t("Must be a valid email", { ns: "validation" }),
  },
})

export default i18n