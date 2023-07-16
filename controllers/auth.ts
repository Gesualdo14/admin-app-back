import { Request, Response } from "express"
import sendEmail from "../helpers/mailer"
import UserModel from "../models/user"
import jwt from "jsonwebtoken"
import { CONFIG } from "../utils/config"
import { MyError } from "../schemas/errors"
import {
  MyRequest,
  GetCodeParams,
  LoginBody,
  LoginParams,
  MyResponse,
} from "../schemas/auth"
import { logger } from "../middlewares/logger"

export const login = async (
  req: MyRequest<LoginBody, LoginParams>,
  res: MyResponse
) => {
  const { email } = req.params
  const { code } = req.body

  const user = await UserModel.findOne({ email, login_code: code })

  if (!user) {
    throw new MyError("Código incorrecto", 400)
  }

  const tokenPayload = {
    sub: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    imageUrl: user.imageUrl,
    roles: user.roles,
  }

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY as string)

  res.cookie("jwt", token, {
    //...... 1s    1m   1h   1d   6 meses
    maxAge: 1000 * 60 * 60 * 24 * 180,
    sameSite: "none",
    secure: true,
    httpOnly: CONFIG.isProd, // Sino cuando pedimos desde Thunder Client no se setea la cookie
  })

  res
    .status(200)
    .json({ ok: true, data: tokenPayload, message: "Inicio de sesión exitoso" })
}

export const generateCode = async (
  req: MyRequest<null, GetCodeParams>,
  res: MyResponse
) => {
  const { email } = req.params

  const user = await UserModel.findOne({ email })
  if (!user) {
    return res.status(400).json({ ok: false, message: "Usuario inexistente" })
  }
  let randomCode = ""

  for (let index = 0; index <= 5; index++) {
    const number = Math.floor(Math.random() * 10)
    randomCode += number
  }

  user.login_code = randomCode
  await user.save()
  sendEmail({
    to: email,
    subject: "Este es tu código: " + randomCode,
    html: "Código para ingresar: " + randomCode,
  })
    .then((res) => console.log(res.message))
    .catch((e) => {
      logger(e, "email", req)
    })
  res.status(200).json({ ok: true, message: "Código enviado con éxito" })
}
