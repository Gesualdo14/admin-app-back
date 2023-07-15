import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import { MyRequest, User } from "../schemas/auth"

export const validateUser = () => {
  return (req: MyRequest, res: Response, next: NextFunction) => {
    console.log("PROTECTED ROUTE, validating user...")
    const token = req.cookies.jwt
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    req.user = user as User
    next()
  }
}
