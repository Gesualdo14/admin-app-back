import { Schema, model } from "mongoose"

const errorSchema = new Schema({}, { strict: false, timestamps: true })
export const ErrorModel = model("Error", errorSchema, "errors")
