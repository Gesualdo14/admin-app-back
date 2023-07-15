import { ErrorModel } from "../models/error"
import { MyRequest } from "../schemas/auth"

export const logger = async (err: any, origin: string, req: MyRequest) => {
  try {
    await ErrorModel.create({
      origin,
      ...err,
      path: req.originalUrl,
      body: req.body,
      params: req.params,
      query: req.query,
      user: req.user,
    })
  } catch (error) {
    console.log("Error al guardar el error")
  }
}
