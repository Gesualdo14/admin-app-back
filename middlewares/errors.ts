import { NextFunction, Response } from "express"
import { MyRequest } from "../schemas/auth"
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import { MongooseError } from "mongoose"
import { ZodError } from "zod"
import { MyError } from "../schemas/errors"
import { logger } from "./logger"

export const handleErrors = (
  err: JsonWebTokenError | TokenExpiredError | Error | MongooseError | ZodError,
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  // No abstraemos en otra función para tener autocomplete
  if (err instanceof ZodError) {
    console.log("ZOD ERROR")
    const firstError = err.errors[0]
    res.status(400).json({
      ok: false,
      message: firstError.message,
    })
    logger(err, "zod", req) // Guardamos completo así vemos si había otros adicionales
    return
  }
  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    console.log("JWT ERROR")
    logger(err, "jwt", req)
    return res.status(401).json({ ok: false, message: err.message })
  }
  if (err instanceof MongooseError) {
    console.log("MONGOOSE ERROR")
    res.status(400).json({ ok: false, message: err.message })
    logger(err, "mongoose", req)
    return
  }

  if (err instanceof MyError) {
    console.log("MY THROWN ERROR")
    logger(err, "custom", req)
    return res.status(err.code).json({ ok: false, message: err.message })
  }

  if (err instanceof Error) {
    logger(err, "unknown", req)
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }

  next(err)
}
