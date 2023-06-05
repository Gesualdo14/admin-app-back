import mongoose from "mongoose"
import SaleModel from "../models/sale"

async function connectDB() {
  if (!process.env.MONGODB_URL) {
    throw new Error("Falta la variable de entorno MONGODB_URL")
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Conexión exitosa con Mongo DB")
    // await SaleModel.create({
    //   operation_date: new Date(),
    //   user: "647a080855cc852e302467aa",
    //   total_amount: 5000,
    // })
  } catch (error) {
    console.log("Hubo un error al conectarnos a la BBDD", error)
  }
}

export default connectDB
