import { InferType, object, string } from "yup"

const createCustomerValidationSchema = object({
  name: string().required(),
  address: string().optional().nullable(),
  phoneNumber: string().optional().nullable().min(10),
  description: string().optional().nullable(),
  email: string().optional().nullable().email(),
})

export type CustomerState = InferType<typeof createCustomerValidationSchema>

export default createCustomerValidationSchema
