import { object, string } from "yup"

const createsupplierValidationSchema = object({
  name: string().required(),
  address: string().required(),
  phoneNumber: string()
    .min(10, "Phone number must be 10 characters or longer")
    .required(),
  description: string().required(),
  email: string().email().required(),
})

export default createsupplierValidationSchema
