import mongoose from "mongoose"
import UserModel from "../models/user"

async function connectDB() {
  if (!process.env.MONGODB_URL) {
    throw new Error("Falta la variable de entorno MONGODB_URL")
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Conexión exitosa con Mongo DB")
    // const newUser = new UserModel({
    //   firstname: "Martín",
    //   lastname: "Gesualdo",
    //   email: "ignaciogesualdo@gmail.com",
    //   login_code: "434354",
    //   roles: {
    //     admin: true,
    //     seller: true,
    //   },
    // })
    // console.log({ newUser })
    // await newUser.save()
  } catch (error) {
    console.log("Hubo un error al conectarnos a la BBDD", error)
  }
}

export default connectDB
