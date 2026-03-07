import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { createFarmLandSchema, updateFarmLandSchema, toggleFarmLandStatus, getSingleFarmlandSchema } from '../validator/farmLand.validator.js'
import { createFarmLand, getAllFarms, getSingleFarmland, toggleFarmLandActiveStatus, updateFarmLand } from '../controllers/farmLand.controller.js'
import { FarmLandLimiter, changeActiveStatusLimiter, getFarmLand } from '../middleware/rate limiter/farmlandRateLimiter.js'
import { authorize } from '../middleware/role.middleware.js'
import { activeFarmer } from '../middleware/aciveFarmer.middleware.js'
import { normalApiLimiter } from '../middleware/rate limiter/authRateLimiter.js'


export const farmLandRoutes = Router()


farmLandRoutes.post('/create', FarmLandLimiter, authLayer, activeFarmer, authorize("farmer"), validate(createFarmLandSchema), createFarmLand)

farmLandRoutes.get('/', normalApiLimiter, getFarmLand, authLayer, activeFarmer, getAllFarms)

farmLandRoutes.patch('/:farmLandId', FarmLandLimiter, authLayer, activeFarmer, authorize("farmer"), validate(updateFarmLandSchema), updateFarmLand)

farmLandRoutes.patch('/active-status/:farmLandId', changeActiveStatusLimiter, authLayer, activeFarmer, authorize("farmer"), validate(toggleFarmLandStatus), toggleFarmLandActiveStatus)

farmLandRoutes.get("/:farmlandId", normalApiLimiter, authLayer, activeFarmer, authorize("farmer"), validate(getSingleFarmlandSchema), getSingleFarmland)