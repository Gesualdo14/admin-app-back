import express from "express"
import { getByCode } from "../controllers/products"
import { validateUser } from "../middlewares/auth"

const router = express.Router()

router.use(validateUser() as any)

router.get("/:code", getByCode)

export default router
