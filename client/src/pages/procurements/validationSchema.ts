import { yupTestUnique } from "@/utils"
import { t } from "i18next"
import {
  array,
  boolean,
  date,
  InferType,
  number,
  object,
  Schema,
  string,
} from "yup"

export const procurementDeliveryStatus = {
  PENDING: "PENDING",
  DELIVERED: "DELIVERED",
}

export const procurementDeliveryStatusOptions = [
  {
    label: t("Pending"),
    value: "PENDING",
  },
  {
    label: t("Delivered"),
    value: "DELIVERED",
  },
]

export const procurementDeliveryStatusArray =
  procurementDeliveryStatusOptions.map((pdso) => pdso.value)

export const procurementPaymentStatus = {
  PAID: "PAID",
  UNPAID: "UNPAID",
}

export const procurementPaymentStatusOptions = [
  {
    label: t("Paid"),
    value: "PAID",
  },
  {
    label: t("Unpaid"),
    value: "UNPAID",
  },
]

export const procurementPaymentStatusArray =
  procurementPaymentStatusOptions.map((ppso) => ppso.value)

const createProcurementProductValidationSchema = object({
  productUnitId: number().required(),
  price: number().required().min(0),
  quantity: number().required().min(1),
} satisfies Record<keyof Monorepo.Api.Request.CreateProcurementProductRequestDto, Schema>)

const createProcurementValidationSchema = object({
  supplierId: number().required().min(1),
  name: string().required(),
  description: string().optional().nullable(),
  invoiceNumber: string().nullable().optional(),
  invoiceDate: date().nullable().optional(),
  deliveryStatus: string().required().oneOf(procurementDeliveryStatusArray),
  deliveredAt: date().nullable().optional(),
  paymentStatus: string().required().oneOf(procurementPaymentStatusArray),
  payedAt: date().nullable().optional(),
  procurementProducts: yupTestUnique({
    arraySchema: array()
      .required()
      .of(createProcurementProductValidationSchema),
    iteratee: (value) => value.productUnitId,
  }),
} satisfies Record<keyof Monorepo.Api.Request.CreateProcurementRequestDto, Schema>)

export type ProcurementState = InferType<
  typeof createProcurementValidationSchema
> & {
  deliveryStatus?: Monorepo.Api.Response.ProcurementResponseDto["deliveryStatus"]
  paymentStatus?: Monorepo.Api.Response.ProcurementResponseDto["paymentStatus"]
  procurementProducts?: (Pick<
    Monorepo.Api.Response.ProcurementProductResponseDto,
    "productUnitId" | "price" | "quantity"
  > & {
    productId: number
  })[]
}

export type ProcurementProductState =
  ProcurementState["procurementProducts"] extends (infer TProcurementProductState)[]
    ? TProcurementProductState
    : never

export default createProcurementValidationSchema
