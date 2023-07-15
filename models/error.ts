import { Schema, model } from "mongoose"

const errorSchema = new Schema({}, { strict: false })
export const ErrorModel = model("Error", errorSchema, "errors")
