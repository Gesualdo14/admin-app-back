import { Schema, model } from "mongoose"

const clientSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneCode: { type: String },
  phoneNumber: { type: String },
  document_type: { type: String, required: true },
  document_value: { type: String, required: true },
  searchField: { type: String, required: true },
  comissions: Number,
  sales: {
    count: Number,
    amount: Number,
  },
})
const ClientModel = model("Client", clientSchema, "clients")
export default ClientModel
