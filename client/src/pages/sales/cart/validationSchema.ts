import { CartState, FlatOrPercentage } from "@/features/cart"
import {
  ObjectSchema,
  Schema,
  array,
  boolean,
  number,
  object,
  string,
} from "yup"

const flatOrPercentage: FlatOrPercentage[] = ["FLAT", "PERCENTAGE"]

const createSaleProductValidationSchema = object({
  productUnitId: number().required(),
  salePrice: number().required().min(0),
  quantity: number().required().min(1),
  subTotal: number().optional(),
  inputDiscount: number().optional(),
  discountType: string().optional().oneOf(flatOrPercentage),
  discount: number().optional(),
  inputTax: number().optional(),
  taxType: string().optional().oneOf(flatOrPercentage),
  tax: number().optional(),
  total: number().optional(),
} satisfies Record<keyof Monorepo.Api.Request.CreateSaleProductRequestDto, Schema>) satisfies ObjectSchema<Monorepo.Api.Request.CreateSaleProductRequestDto>

const createSaleValidationSchema = object({
  name: string().required(),
  description: string().optional().nullable(),
  customerId: number().optional().nullable(),
  subTotal: number().optional(),
  inputDiscountTotal: number().optional(),
  discountTotalType: string().optional().oneOf(flatOrPercentage),
  discountTotal: number().optional(),
  inputTaxTotal: number().optional(),
  taxTotalType: string().optional().oneOf(flatOrPercentage),
  taxTotal: number().optional(),
  total: number().optional(),
  paid: number().optional().min(0),
  change: number().optional().min(0),
  saleProducts: array().required().of(createSaleProductValidationSchema),
} satisfies Record<keyof Monorepo.Api.Request.CreateSaleRequestDto, Schema>) satisfies ObjectSchema<Monorepo.Api.Request.CreateSaleRequestDto>

export default createSaleValidationSchema
