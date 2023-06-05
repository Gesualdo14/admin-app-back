import express from "express"
import authRoutes from "./auth"
import salesRoutes from "./sales"
const router = express.Router()

router.use("/auth", authRoutes)
router.use("/sales", salesRoutes)

export default router
