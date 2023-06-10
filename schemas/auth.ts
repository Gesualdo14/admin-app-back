import { Request } from "express"

export interface User {
  sub: string
  firstname: string
  lastname: string
  roles: {
    admin: boolean
    seller: boolean
  }
}

export interface AuthRequest<
  ReqBody = any,
  Params = any,
  ResBody = any,
  ReqQuery = any,
  Locals extends Record<string, any> = any
> extends Request<Params, ResBody, ReqBody, ReqQuery, Locals> {
  user?: User
  cookies: {
    jwt: string
  }
}
