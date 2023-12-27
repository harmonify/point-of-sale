import { InferType, object, string } from "yup"

const createUnitValidationSchema = object({
  name: string().required(),
  description: string().optional().nullable(),
})

export type UnitState = InferType<typeof createUnitValidationSchema>

export default createUnitValidationSchema
