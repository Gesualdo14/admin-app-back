import mongoose from "mongoose"
import SaleModel from "../models/sale"
import ClientModel from "../models/client"
import ProductModel from "../models/product"

async function connectDB() {
  if (!process.env.MONGODB_URL) {
    throw new Error("Falta la variable de entorno MONGODB_URL")
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Conexión exitosa con Mongo DB")
    await SaleModel.deleteMany()
    const clients = await ClientModel.find()
    for (const client of clients) {
      await ClientModel.findByIdAndUpdate(client._id, {
        comissions: 0,
        "sales.count": 0,
        "sales.amount": 0,
      })
    }
    const products = await ProductModel.find()
    for (const product of products) {
      await ProductModel.findByIdAndUpdate(product._id, {
        sold: false,
        sales: null,
      })
    }
    console.log("Listo")
  } catch (error) {
    console.log("Hubo un error al conectarnos a la BBDD", error)
  }
}

export default connectDB
