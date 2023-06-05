import { Request, Response } from "express"
import SaleModel from "../models/sale"

export const getAll = async (req: any, res: Response) => {
  try {
    const sales = await SaleModel.find({ user: req.user.sub })

    res.status(200).json({ ok: true, data: sales })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}

export const create = async (req: any, res: Response) => {
  const { operation_date, total_amount } = req.body
  const createdSale = await SaleModel.create({
    operation_date,
    total_amount,
    user: req.user.sub,
  })
  res.status(201).json({ ok: true, data: createdSale })
}
