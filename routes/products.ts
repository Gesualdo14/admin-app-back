import express from "express"
import { getByCode, getAll } from "../controllers/products"
import { validateUser } from "../middlewares/auth"

const router = express.Router()

router.use(validateUser() as any)

router.get("/", getAll)
router.get("/:code", getByCode)

export default router
