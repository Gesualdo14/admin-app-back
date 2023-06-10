import express from "express"
import { getAll, create, getById } from "../controllers/sales"
import { validateUser } from "../middlewares/auth"
import { validateRequest } from "../middlewares/validateRequest"
import { SaleCreationSchema } from "../schemas/sales"

const router = express.Router()

router.use(validateUser())

router.get("/", getAll)
router.get("/:id", getById)
router.post("/", validateRequest(SaleCreationSchema), create)

export default router
