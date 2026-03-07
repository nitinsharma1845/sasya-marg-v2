import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { addPreviousCrop as addPreviousCropValidator } from '../validator/previousCrop.validator.js'
import { addPreviousCrop, updatePreviousCrop } from '../controllers/previousCrop.controller.js'
import { previousCropLimiter } from '../middleware/rate limiter/previousCropLimiter.js'
import { authorize } from '../middleware/role.middleware.js'


export const previousCropRoutes = Router()

previousCropRoutes.post("/:farmLandId", previousCropLimiter, authLayer, authorize("farmer"), validate(addPreviousCropValidator), addPreviousCrop)

previousCropRoutes.patch("/:farmLandId", previousCropLimiter, authLayer, authorize("farmer"), validate(addPreviousCropValidator), updatePreviousCrop)