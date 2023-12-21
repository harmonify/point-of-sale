import id from "./resources/id.json"
import idAction from "./resources/id_action.json"
import idField from "./resources/id_field.json"
import idError from "./resources/id_error.json"

export const defaultNS = "translation"

export const idResource = {
  translation: id,
  action: idAction,
  field: idField,
  error: idError,
}

export type IResourceLanguage = typeof idResource
