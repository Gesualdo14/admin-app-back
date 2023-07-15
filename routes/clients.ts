import express from "express"
import * as ctrl from "../controllers/clients"
import { validateUser } from "../middlewares/auth"
import { validateRequest } from "../middlewares/validateRequest"
import * as sch from "../schemas/clients"

const router = express.Router()
router.use(validateUser())

router.get("/", validateRequest(sch.GetAllSchema), ctrl.getAll)
router.get("/:id", validateRequest(sch.GetByIdSchema), ctrl.getById)
router.get(
  "/document/:document",
  validateRequest(sch.GetByDocumentSchema),
  ctrl.getByDocument
)
router.post("/", validateRequest(sch.CreationSchema), ctrl.create)
router.put("/:id", validateRequest(sch.EditionSchema), ctrl.update)

export default router
