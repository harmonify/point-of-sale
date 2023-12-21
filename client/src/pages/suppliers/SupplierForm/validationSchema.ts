import { InferType, object, string } from "yup"

const createSupplierValidationSchema = object({
  name: string().required(),
  address: string().optional().nullable(),
  phoneNumber: string().required().min(10),
  description: string().optional().nullable(),
  email: string().optional().nullable().email(),
})

export type SupplierState = InferType<typeof createSupplierValidationSchema>

export default createSupplierValidationSchema
