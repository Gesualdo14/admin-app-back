import { Response } from "express"
import SaleModel from "../models/sale"
import ClientModel from "../models/client"
import { MyRequest, User } from "../schemas/auth"
import { Sale } from "../schemas/sales"
import genCreationDate from "../helpers/genCreationDate"
import ProductModel from "../models/product"
import { Types } from "mongoose"

const { ObjectId } = Types

type GetAllFilter = {
  user?: string | undefined
  "creation.month"?: number
  "creation.year"?: number
}

export const getAll = async (
  req: MyRequest<null, null, { month: string; year: string }>,
  res: Response
) => {
  const { month, year } = req.query

  const { sub, roles } = req.user as User // Yo se que si llegó hasta acá, hay un user

  try {
    const filter: GetAllFilter = roles.admin ? {} : { user: sub }

    if (!!month) {
      filter["creation.month"] = +month
      filter["creation.year"] = +year
    }

    const sales = await SaleModel.find(filter)
      .populate("client", "firstname lastname")
      .sort({ _id: -1 })
      .limit(!!month ? 100 : 10)

    res.status(200).json({ ok: true, data: sales })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}

export const getSummary = async (req: MyRequest, res: Response) => {
  try {
    const { roles, sub } = req.user as User
    const filter = roles.admin ? {} : { user: new ObjectId(sub) }

    const sales = await SaleModel.aggregate([
      {
        $match: filter,
      }, // Filtrar la información
      {
        $group: {
          _id: { month: "$creation.month", year: "$creation.year" },
          sales: { $sum: "$total_amount" },
          gathered: { $sum: "$gathered" },
          count: { $sum: 1 },
        },
      }, // Sumarizarla por mes
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ])

    res.status(200).json({ ok: true, data: sales })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}

export const getById = async (req: MyRequest, res: Response) => {
  const { id } = req.params
  try {
    const sale = await SaleModel.findById(id)

    res.status(200).json({ ok: true, data: sale })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}

export const create = async (req: MyRequest<Sale>, res: Response) => {
  const { products, payment_methods, client, referalDoc, comissions } = req.body

  const total_amount = products.reduce(
    (acc: number, curr) => acc + curr.unit_price,
    0
  )

  const gathered = payment_methods.reduce(
    (acc: number, curr: any) => acc + curr.amount,
    0
  )

  const createdSale = await SaleModel.create({
    operation_date: new Date(),
    total_amount,
    gathered,
    products,
    payment_methods,
    referalDoc,
    client,
    user: req.user?.sub,
    creation: genCreationDate(),
  })

  await ClientModel.findByIdAndUpdate(createdSale.client, {
    $inc: { "sales.count": 1, "sales.amount": total_amount },
  })

  if (!!referalDoc) {
    await ClientModel.findOneAndUpdate(
      { document_value: referalDoc },
      { $inc: { comissions: 1 } }
    )
  }

  if (!!comissions) {
    await ClientModel.findByIdAndUpdate(client, {
      $inc: { comissions: -comissions },
    })
  }

  for (const product of products) {
    await ProductModel.findOneAndUpdate({ code: product.code }, { sold: true })
  }
  res.status(201).json({ ok: true, data: createdSale })
}
