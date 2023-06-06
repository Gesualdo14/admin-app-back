import express from "express"
import { getAll, create, getById, update } from "../controllers/clients"
import { validateUser } from "../middlewares/auth"

const router = express.Router()
router.use(validateUser())

router.get("/", getAll)
router.get("/:id", getById)
router.post("/", create)
router.put("/:id", update)

export default router
