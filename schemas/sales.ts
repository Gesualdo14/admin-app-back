import { z } from "zod"
import { isValidObjectId } from "mongoose"

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
  unit_price: z.number(),
  discount: z.number().optional(),
})
const salePaymentMethodSchema = z.object({
  method: z.enum(PAYMENT_METHOD_TYPES),
  amount: z.number(),
  time_unit: TIME_UNITS.nullish(),
  time_value: z.number().nullish(),
})

export const saleSchema = z.object({
  products: z.array(saleProductSchema),
  payment_methods: z.array(salePaymentMethodSchema),
  client: z.custom(isValidObjectId),
  comissions: z.number().nullish(),
  referalDoc: z.string().nullish(),
})

export const CreationSchema = z.object({
  body: saleSchema,
})

export const GetByIdSchema = z.object({
  params: z.object({ id: z.custom(isValidObjectId, "ID inválido") }),
})

export type Sale = z.infer<typeof saleSchema>
