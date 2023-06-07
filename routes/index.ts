import express from "express"
import authRoutes from "./auth"
import salesRoutes from "./sales"
import clientsRoutes from "./clients"
import productsRoutes from "./products"
const router = express.Router()

router.use("/auth", authRoutes)
router.use("/sales", salesRoutes)
router.use("/products", productsRoutes)
router.use("/clients", clientsRoutes)

export default router
