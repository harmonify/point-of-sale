import { t } from "i18next"
import { InferType, object, string } from "yup"

export const genderOptions = [
  {
    label: "",
    value: "NOT_DEFINED",
  },
  {
    label: t("Male"),
    value: "MALE",
  },
  {
    label: t("Female"),
    value: "FEMALE",
  },
]
const genderArray = genderOptions.map((g) => g.value)

const createCustomerValidationSchema = object({
  name: string().required(),
  gender: string().optional().oneOf(genderArray),
  address: string().optional().nullable(),
  phoneNumber: string().optional().nullable().min(10),
  description: string().optional().nullable(),
  email: string().optional().nullable().email(),
})

export type CustomerState = InferType<typeof createCustomerValidationSchema>

export default createCustomerValidationSchema
