import { Request, Response } from "express"
import ProductModel from "../models/product"

export const getByCode = async (req: any, res: Response) => {
  const { code } = req.params
  try {
    const product = await ProductModel.findOne({ code })

    res.status(200).json({ ok: true, data: product })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}
