import type id from "./resources/id.json"
import type idError from "./resources/id_error.json"

export const defaultNS = "translation"

export type IResourceLanguage = {
  translation: typeof id
  error: typeof idError
}
