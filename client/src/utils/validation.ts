import { t } from "i18next"
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
