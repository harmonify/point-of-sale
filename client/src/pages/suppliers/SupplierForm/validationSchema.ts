import { object, string } from "yup"

const createsupplierValidationSchema = object({
  name: string().required(),
  address: string().optional().nullable(),
  phoneNumber: string().required().min(10),
  description: string().optional().nullable(),
  email: string().optional().nullable().email(),
})

export default createsupplierValidationSchema
