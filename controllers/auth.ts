import { Request, Response } from "express"
import sendEmail from "../helpers/mailer"
import UserModel from "../models/user"

export const login = async (req: Request, res: Response) => {
  const { email } = req.params
  const { code } = req.body
  console.log({ email, code })

  const user = await UserModel.findOne({ email, login_code: code })

  if (!user) {
    return res.status(400).json({ ok: false, message: "Código incorrecto" })
  }

  res.status(200).json({ ok: true, message: "Inicio de sesión exitoso" })
}

export const generateCode = async (req: Request, res: Response) => {
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
  res.send("GENERATE CODE")
}
