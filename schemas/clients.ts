import { z } from "zod"
import { isValidObjectId } from "mongoose"

const DOC_TYPES = [
  "RUC",
  "Cédula",
  "Pasaporte",
  "Identificación Exterior",
] as const

const GetAllQueryParams = z.object({ searchText: z.string().optional() })
export const GetByIdParams = z.object({
  id: z.custom(isValidObjectId, "ID inválido"),
})
const GetByDocumentParams = z.object({ document: z.string().min(4) })

export const ClientSchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  email: z.string().email("Email inválido"),
  phoneCode: z.string().default("593"),
  phoneNumber: z.string().length(10),
  document_type: z.enum(DOC_TYPES),
  document_value: z.string().min(4),
})

export const GetAllSchema = z.object({
  query: GetAllQueryParams, // Tiene que cumplirse todo el esquema
})

export const CreationSchema = z.object({
  body: ClientSchema, // Tiene que cumplirse todo el esquema
})

export const EditionSchema = z.object({
  body: ClientSchema.partial(), // Podrían no venir todos los campos
  params: z.object({
    id: z.custom(isValidObjectId, "ID inválido"),
  }),
})

export const GetByIdSchema = z.object({
  params: GetByIdParams,
})

export const GetByDocumentSchema = z.object({
  params: GetByDocumentParams,
})

export type Client = z.infer<typeof ClientSchema>
export type GetAllQueryParams = z.infer<typeof GetAllQueryParams>
export type GetByIdParams = z.infer<typeof GetByIdParams>
export type GetByDocumentParams = z.infer<typeof GetByDocumentParams>
