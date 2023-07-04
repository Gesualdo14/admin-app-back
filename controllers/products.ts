import { Response } from "express"
import ProductModel from "../models/product"

export const getAll = async (req: any, res: Response) => {
  const { searchText, toSell } = req.query
  const regexSearch = new RegExp(searchText, "i")

  const filter: any = !searchText
    ? {}
    : { $or: [{ name: regexSearch }, { code: regexSearch }] }

  if (toSell === "true") {
    filter.sold = false
  }

  const products = await ProductModel.find(filter)

  res.status(200).json({ ok: true, data: products })
}

export const getByCode = async (req: any, res: Response) => {
  const { code } = req.params
  try {
    const product = await ProductModel.findOne({ code })

    res.status(200).json({ ok: true, data: product })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}
