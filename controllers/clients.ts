import { Request, Response } from "express"
import ClientModel from "../models/client"
import { Client } from "../schemas/clients"
import { cleanStrings } from "../helpers/cleanStrings"

export const getAll = async (req: Request, res: Response) => {
  const { searchText } = req.query

  const searching = !!searchText && typeof searchText === "string"

  const filter = searching
    ? {
        searchField: { $regex: new RegExp(cleanStrings([searchText])) },
      }
    : {}
  console.log({ filter })
  try {
    const clients = await ClientModel.find(filter)

    res.status(200).json({ ok: true, data: clients })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const client = await ClientModel.findById(id)

    res.status(200).json({ ok: true, data: client })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}
export const getByDocument = async (req: Request, res: Response) => {
  const { document } = req.params
  try {
    const client = await ClientModel.findOne({ document_value: document })

    res.status(200).json({ ok: true, data: client })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ ok: false, message: "Error del servidor" })
  }
}

export const create = async (req: Request<any, any, Client>, res: Response) => {
  const createdClient = await ClientModel.create({
    ...req.body,
    searchField: cleanStrings([
      req.body.firstname,
      req.body.lastname,
      req.body.document_value,
    ]),
  })
  res.status(201).json({ ok: true, data: createdClient })
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedClient = await ClientModel.findByIdAndUpdate(id, {
    ...req.body,
    searchField: cleanStrings([
      req.body.firstname,
      req.body.lastname,
      req.body.document_value,
    ]),
  })
  res.status(201).json({ ok: true, data: updatedClient })
}
