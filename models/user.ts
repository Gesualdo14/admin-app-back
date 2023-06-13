import { Schema, model } from "mongoose"

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  login_code: { type: String, required: true, length: 6 },
  imageUrl: String,
  roles: {
    type: {
      admin: Boolean,
      seller: Boolean,
    },
    required: true,
  },
})

export default model("User", userSchema, "users")
