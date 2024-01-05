import { TFunction } from "i18next"
import { setLocale } from "yup"

function setupYupLocale(t: TFunction) {
  return setLocale({
    mixed: {
      default: (params) =>
        t("default", { ns: "validation", label: params.label }),
      required: (params) =>
        t("required", { ns: "validation", label: params.label }),
    },
    number: {
      min: ({ min }) => t("number.min", { ns: "validation", x: min }),
      max: ({ max }) => t("number.min", { ns: "validation", x: max }),
    },
    string: {
      email: t("string.email", { ns: "validation" }),
      min: ({ min }) => {
        return t("string.min", {
          ns: "validation",
          x: min,
        })
      },
      max: ({ max }) => {
        return t("string.max", {
          ns: "validation",
          x: max,
        })
      },
    },
  })
}

export default setupYupLocale
