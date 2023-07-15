import ClientModel from "../models/client"
import {
  Client,
  GetAllQueryParams,
  GetByDocumentParams,
  GetByIdParams,
} from "../schemas/clients"
import { cleanStrings } from "../helpers/cleanStrings"
import { MyRequest, MyResponse } from "../schemas/auth"

export const getAll = async (
  req: MyRequest<null, null, GetAllQueryParams>,
  res: MyResponse
) => {
  const { searchText } = req.query

  const searching = !!searchText && searchText !== "undefined" // Solo si no controlamos bien el frontend

  const filter = searching
    ? {
        searchField: { $regex: new RegExp(cleanStrings([searchText])) },
      }
    : {}

  const clients = await ClientModel.find(filter)
  res.status(200).json({ ok: true, data: clients })
}

export const getById = async (
  req: MyRequest<null, GetByIdParams>,
  res: MyResponse
) => {
  const { id } = req.params

  const client = await ClientModel.findById(id)

  res.status(200).json({ ok: true, data: client })
}

export const getByDocument = async (
  req: MyRequest<null, GetByDocumentParams>,
  res: MyResponse
) => {
  const { document } = req.params

  const client = await ClientModel.findOne({ document_value: document })

  res.status(200).json({ ok: true, data: client })
}

export const create = async (req: MyRequest<Client>, res: MyResponse) => {
  const createdClient = await ClientModel.create({
    ...req.body,
    searchField: cleanStrings([
      req.body.firstname,
      req.body.lastname,
      req.body.document_value,
    ]),
  })
  res.status(201).json({
    ok: true,
    message: "Cliente creado con éxito",
    data: createdClient,
  })
}

export const update = async (
  req: MyRequest<Client, { id: string }>,
  res: MyResponse
) => {
  const { id } = req.params
  const updatedClient = await ClientModel.findByIdAndUpdate(id, {
    ...req.body,
    searchField: cleanStrings([
      req.body.firstname,
      req.body.lastname,
      req.body.document_value,
    ]),
  })
  res.status(201).json({
    ok: true,
    message: "Cliente actualizado con éxito",
    data: updatedClient,
  })
}
