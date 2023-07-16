import mongoose from "mongoose"
import { resetDB } from "../helpers/resetDB"

async function connectDB() {
  if (!process.env.MONGODB_URL) {
    throw new Error("Falta la variable de entorno MONGODB_URL")
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Conexión exitosa con Mongo DB")
    await resetDB()
  } catch (error) {
    console.log("Hubo un error al conectarnos a la BBDD", error)
  }
}

export default connectDB
