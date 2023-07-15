import ProductModel from "../models/product"
import { MyRequest, MyResponse } from "../schemas/auth"
import { GetAllQueryParams, Product } from "../schemas/products"

type GetAllFilter = {
  $or?: [{ name: RegExp }, { code: RegExp }]
  sold?: boolean
}

export const getAll = async (
  req: MyRequest<null, null, GetAllQueryParams>,
  res: MyResponse
) => {
  const { searchText, toSell } = req.query

  let filter: GetAllFilter = {}
  const isSearching = !!searchText
  if (isSearching) {
    const regexSearch = new RegExp(searchText, "i")
    filter = { $or: [{ name: regexSearch }, { code: regexSearch }] }
  }

  if (toSell === "true") {
    filter.sold = false
  }

  const products = await ProductModel.find(filter)
    .sort({ _id: -1 })
    .limit(isSearching ? 100 : 10)

  res.status(200).json({ ok: true, data: products })
}

export const getById = async (
  req: MyRequest<null, { id: string }>,
  res: MyResponse
) => {
  const { id } = req.params

  const product = await ProductModel.findById(id)

  res.status(200).json({ ok: true, data: product })
}

export const getByCode = async (
  req: MyRequest<null, { code: string }>,
  res: MyResponse
) => {
  const { code } = req.params

  const product = await ProductModel.findOne({ code })

  res.status(200).json({ ok: true, data: product })
}

export const create = async (req: MyRequest<Product>, res: MyResponse) => {
  const createdProduct = await ProductModel.create(req.body)
  res.status(201).json({
    ok: true,
    message: "Producto creado con éxito",
    data: createdProduct,
  })
}

export const update = async (
  req: MyRequest<Product, { id: string }>,
  res: MyResponse
) => {
  const { id } = req.params
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body)
  res.status(201).json({
    ok: true,
    message: "Producto actualizado con éxito",
    data: updatedProduct,
  })
}
