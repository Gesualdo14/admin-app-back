import express from "express"
import { generateCode, login } from "../controllers/auth"
import { validateRequest } from "../middlewares/validateRequest"
import { GetCodeSchema, LoginSchema } from "../schemas/auth"

const router = express.Router()

router.post("/login/:email", validateRequest(LoginSchema), login)
router.post("/login/:email/code", validateRequest(GetCodeSchema), generateCode)

export default router
