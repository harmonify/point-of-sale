import { yupTestUnique } from "@/utils"
import { array, boolean, InferType, number, object, Schema, string } from "yup"

export const barcodeTypes = {
  EAN_8: "EAN_8",
  EAN_13: "EAN_13",
  CODABAR: "CODABAR",
  CODE_128: "CODE_128",
  CODE_39: "CODE_39",
  CODE_11: "CODE_11",
  UPC_A: "UPC_A",
  UPC_C: "UPC_C",
}
export const barcodeTypeArray = Object.values(barcodeTypes)
export const barcodeTypeOptions = barcodeTypeArray.map((bt) => ({
  label: bt.replaceAll("_", " "),
  value: bt,
}))

const createProductUnitValidationSchema = object({
  unitId: number().required(),
  price: number().required().min(0),
})

const createProductValidationSchema = object({
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
  productUnits: yupTestUnique({
    arraySchema: array().required().of(createProductUnitValidationSchema),
    iteratee: (value) => value.unitId,
  }),
} satisfies Record<keyof Monorepo.Api.Request.CreateProductRequestDto, Schema>)

export type ProductState = InferType<typeof createProductValidationSchema> & {
  barcodeType?: Monorepo.Api.Response.ProductResponseDto["barcodeType"]
}

export type ProductUnitState =
  ProductState["productUnits"] extends (infer TProductUnitState)[]
    ? TProductUnitState
    : never

export default createProductValidationSchema
