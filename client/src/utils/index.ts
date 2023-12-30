export { differenceBy } from "./array"

export {
  formatGender,
  formatISOToLocale,
  formatRupiah,
  parseApiErrorMessage,
  removeEmptyStrings,
  sentenceCase,
} from "./string"

export { isValueExists, yupTestUnique } from "./validation"

export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
