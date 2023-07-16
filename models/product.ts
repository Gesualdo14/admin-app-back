import { Schema, model } from "mongoose"

export const productSchema = new Schema({
  name: { type: String, required: true },
  code: {
    type: String,
    required: true,
    unique: true, // Validación de BBDD, no podemos hacerla antes, nos llega como MongoDB error
  },
  supplier_cost: { type: Number, required: true },
  iva: {
    type: [Number, "El IVA debe ser de tipo número"],
    default: 0.12,
    required: [true, "El IVA es requerido"],
  },
  micro: { type: Number, default: 5.55, required: true },
  salvament_margin: { type: Number, default: 0.25, required: true },
  profit_margin: { type: Number, default: 0.15, required: true },
  discount: { type: Number, default: 0, required: true },
  sold: { type: Boolean, default: false },
})

const ProductModel = model("Product", productSchema, "products")
export default ProductModel
