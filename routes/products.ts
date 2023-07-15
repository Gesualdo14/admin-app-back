import express from "express"
import * as ctrl from "../controllers/products"
import { validateUser } from "../middlewares/auth"
import { validateRequest } from "../middlewares/validateRequest"
import * as s from "../schemas/products"

const router = express.Router()

router.use(validateUser() as any)

router.get("/", validateRequest(s.GetAllSchema), ctrl.getAll)
router.get("/:id", validateRequest(s.GetByIdSchema), ctrl.getById)
router.get("/find/:code", validateRequest(s.GetByCodeSchema), ctrl.getByCode)
router.post("/", validateRequest(s.CreationSchema), ctrl.create)
router.put("/:id", validateRequest(s.EditionSchema), ctrl.update)

export default router
