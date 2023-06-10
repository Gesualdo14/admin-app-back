import { NextFunction, Request, Response } from "express"
import { AnyZodObject, ZodError } from "zod"

export const validateRequest = (schema: AnyZodObject) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      console.log("Validating request")

      const result = schema.parse({ body: req.body, params: req.params })

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          ok: false,
          errors: error.errors.map((e) => ({
            code: e.code,
            message: e.message,
            path: e.path,
          })),
        })
      }
      console.log("Server error", { error })
      res.status(500).json({ ok: false, message: "Error del servidor" })
    }
  }
}
