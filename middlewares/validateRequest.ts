import { NextFunction, Response } from "express"
import { AnyZodObject } from "zod"

export const validateRequest = (schema: AnyZodObject) => {
  return (req: any, _: Response, next: NextFunction) => {
    console.log("Validating request")
    schema.parse({ body: req.body, params: req.params, query: req.query })
    console.log("Valid request")
    next()
  }
}
