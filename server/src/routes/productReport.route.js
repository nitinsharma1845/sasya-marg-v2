import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { createReportSchema, getAllReportSchema } from '../validator/projectReport.validator.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/multer.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { createProductReport, getProductReports } from '../controllers/productReport.controller.js'

export const reportRouter = Router()

reportRouter.post("/", authLayer, authorize("buyer"), upload.array("images", 5), validate(createReportSchema), createProductReport)

reportRouter.get("/", authLayer, authorize("buyer", "admin"), validate(getAllReportSchema), getProductReports)