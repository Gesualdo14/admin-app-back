import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

interface EmailParams {
  to: string
  subject: string
  html: string
}

const sendEmail = async ({ to, subject, html }: EmailParams) => {
  try {
    const result = await transporter.sendMail({
      from: `Company <mgesualdo@equip-arte.com>`, // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
    })
    console.log({ result })
    return { ok: true, message: "Excelente, mail enviado con éxito!" }
  } catch (error) {
    console.log({ error })
    return {
      ok: false,
      message: "Hubo un problema al enviar el email",
      err: error,
    }
  }
}

export default sendEmail
