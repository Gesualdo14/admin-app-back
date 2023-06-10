import { isValidObjectId } from "mongoose"
import { z } from "zod"
import validateObjectId from "../helpers/validateObjectId"

const PAYMENT_METHOD_TYPES = [
  "Sin utilización Sist. Financiero",
  "Compensación de deudas",
  "Tarjeta de débito",
  "Tarjeta de crédito",
  "Dinero electrónico",
  "Otros con utilización del sistema financiero",
  "Endoso de títulos",
] as const

const TIME_UNITS = z.enum(["Días", "Meses", "Años"])

const saleProductSchema = z.object({
  code: z.string(),
  name: z.string().optional(),
  qty: z.number(),
  unit_price: z.number(),
  discount: z.number().optional(),
})
const salePaymentMethodSchema = z.object({
  method: z.enum(PAYMENT_METHOD_TYPES),
  amount: z.number(),
  time_unit: TIME_UNITS,
  time_value: z.number(),
})

export const saleSchema = z.object({
  operation_date: z.string(),
  total_amount: z.number(),
  products: z.array(saleProductSchema),
  payment_methods: z.array(salePaymentMethodSchema),
  client: z.custom(validateObjectId),
})

export const SaleCreationSchema = z.object({
  body: saleSchema,
})

export type Sale = z.infer<typeof saleSchema>
