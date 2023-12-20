import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import { defaultNS } from "."
import id from "./resources/id.json"
import idError from "./resources/id_error.json"

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS,
    resources: { id: { translation: id, error: idError } },
    lng: "id", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

// setLocale({
//   // use constant translation keys for messages without values
//   mixed: {
//     default: "validationError.field_invalid",
//   },
//   // use functions to generate an error object that includes the value from the schema
//   number: {
//     min: ({ min }) => ({
//       key: "validationError.field_too_short",
//       values: { min },
//     }),
//     max: ({ max }) => ({
//       key: "validationError.field_too_big",
//       values: { max },
//     }),
//   },
// })

export default i18n
