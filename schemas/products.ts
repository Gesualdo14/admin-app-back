import z from "zod"
import { GetByIdParams } from "./clients"
import { isValidObjectId } from "mongoose"

export const ProductSchema = z.object({
  name: z.string(),
  code: z.string(),
  supplier_cost: z.number(),
  iva: z.number({
    invalid_type_error: "El IVA debe ser un número",
    required_error: "El IVA es requerido",
  }),
  discount: z.number({ invalid_type_error: "El descuento debe ser un número" }),
  micro: z.number(),
  salvament_margin: z.number(),
  profit_margin: z.number(),
  sold: z.boolean().optional(),
})

const GetAllQueryParams = z.object({
  searchText: z.string().optional(),
  toSell: z.enum(["true", "false"]).optional(),
})
export const GetAllSchema = z.object({
  query: GetAllQueryParams,
})

export const CreationSchema = z.object({
  body: ProductSchema, // Tiene que cumplirse todo el esquema
})

export const EditionSchema = z.object({
  body: ProductSchema.partial(), // Podrían no venir todos los campos
  params: z.object({
    id: z.custom(isValidObjectId, "ID inválido"),
  }),
})

export const GetByCodeSchema = z.object({
  params: z.object({ code: z.string().length(6) }),
})
export const GetByIdSchema = z.object({
  params: GetByIdParams, // Me lo traje de CLIENT
})

export type GetAllQueryParams = z.infer<typeof GetAllQueryParams>
export type Product = z.infer<typeof ProductSchema>
