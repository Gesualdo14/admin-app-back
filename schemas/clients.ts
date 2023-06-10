import { z } from "zod"
import validateObjectId from "../helpers/validateObjectId"

const DOC_TYPES = [
  "RUC",
  "Cédula",
  "Pasaporte",
  "Identificación Exterior",
] as const

export const ClientSchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  email: z.string().email("Email inválido"),
  document_type: z.enum(DOC_TYPES),
  document_value: z.string().min(4),
})

export const ClientCreationSchema = z.object({
  body: ClientSchema,
})
export const ClientEditionSchema = z.object({
  body: ClientSchema.partial(),
  params: z.object({
    id: z.custom(validateObjectId, "PARAM ID de cliente inválido"),
  }),
})

export type Client = z.infer<typeof ClientSchema>
