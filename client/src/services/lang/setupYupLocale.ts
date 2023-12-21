import { TFunction } from "i18next"
import { setLocale } from "yup"

function setupYupLocale(t: TFunction) {
  return setLocale({
    mixed: {
      default: (params) =>
        t("default", { ns: "validation", label: params.label }),
      required: t("required", { ns: "validation" }),
    },
    number: {
      min: ({ min }) => ({
        key: "number.min",
        values: { min },
      }),
      max: ({ max }) => ({
        key: "number.min",
        values: { max },
      }),
    },
    string: {
      email: t("string.email", { ns: "validation" }),
      min: (params) => {
        return t("string.min", {
          ns: "validation",
          x: params.min.toString(),
        })
      },
    },
  })
}

export default setupYupLocale
