import express from "express"
import { generateCode, login } from "../controllers/auth"

const router = express.Router()

router.post("/login/:email", login)
router.post("/login/:email/code", generateCode)

export default router
