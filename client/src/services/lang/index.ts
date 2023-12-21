import id from "./resources/id.json"
import idAction from "./resources/id_action.json"
import idError from "./resources/id_error.json"
import idMessage from "./resources/id_message.json"
import idValidation from "./resources/id_validation.json"

export const defaultNS = "translation"

export const idResource = {
  translation: id,
  action: idAction,
  message: idMessage,
  error: idError,
  validation: idValidation,
}

export type IResourceLanguage = typeof idResource
