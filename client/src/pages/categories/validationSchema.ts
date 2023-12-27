import { InferType, object, string } from "yup"

const createCategoryValidationSchema = object({
  name: string().required(),
  description: string().optional().nullable(),
})

export type CategoryState = InferType<typeof createCategoryValidationSchema>

export default createCategoryValidationSchema
