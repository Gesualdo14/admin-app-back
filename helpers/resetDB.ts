import SaleModel from "../models/sale"
import ClientModel from "../models/client"
import ProductModel from "../models/product"

export const resetDB = async () => {
  console.log("Reseting DB data...")
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
  console.log("Done")
}
