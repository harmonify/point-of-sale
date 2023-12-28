import { yupTestUnique } from "@/utils"
import { array, boolean, InferType, number, object, Schema, string } from "yup"

const createProcurementProductValidationSchema = object({
  unitId: number().required(),
  price: number().required().min(0),
})

const createProcurementValidationSchema = object({
  name: string().required(),
  description: string().optional().nullable(),
  categoryId: number().required().min(1),
  barcode: string().optional().nullable(),
  barcodeType: string().when("barcode", (values: any[], schema, options) => {
    if (!!values[0]) {
      return schema.required().oneOf(barcodeTypeArray)
    } else {
      return schema.optional().nullable().oneOf(barcodeTypeArray)
    }
  }),
  isActive: boolean().optional(),
  procurementProducts: yupTestUnique({
    arraySchema: array()
      .required()
      .of(createProcurementProductValidationSchema),
    iteratee: (value) => value.unitId,
  }),
} satisfies Record<keyof Monorepo.Api.Request.CreateProcurementRequestDto, Schema>)

export type ProcurementState = InferType<
  typeof createProcurementValidationSchema
> & {
  barcodeType?: Monorepo.Api.Response.ProcurementResponseDto["barcodeType"]
}

export type ProcurementProductState =
  ProcurementState["procurementProducts"] extends (infer TProcurementProductState)[]
    ? TProcurementProductState
    : never

export default createProcurementValidationSchema
