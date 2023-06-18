import { Response } from "express"
import SaleModel from "../models/sale"
import ClientModel from "../models/client"
import { AuthRequest } from "../schemas/auth"
import { Sale } from "../schemas/sales"

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const filter = req.user?.roles.admin ? {} : { user: req.user?.sub }
    const sales = await SaleModel.find(filter)

    res.status(200).json({ ok: true, data: sales })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}

export const getById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  try {
    const sale = await SaleModel.findById(id)

    res.status(200).json({ ok: true, data: sale })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}

export const create = async (req: AuthRequest<Sale>, res: Response) => {
  const { products, payment_methods, client } = req.body

  const total_amount = payment_methods.reduce(
    (acc, curr) => acc + curr.amount,
    0
  )

  const createdSale = await SaleModel.create({
    operation_date: new Date(),
    total_amount,
    products,
    payment_methods,
    client,
    user: req.user?.sub,
  })

  await ClientModel.findByIdAndUpdate(createdSale.client, {
    $inc: { "sales.count": 1, "sales.amount": total_amount },
  })
  res.status(201).json({ ok: true, data: createdSale })
}
