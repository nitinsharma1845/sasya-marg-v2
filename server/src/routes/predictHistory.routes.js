import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { getAllPredictHistorySchema, getSinglePredictHistorySchema } from '../validator/cropSuggestion.validator.js'
import { getPredictedHistory, getSinglePredictHistory } from '../controllers/predictHistory.controller.js'
import { activeFarmer } from '../middleware/aciveFarmer.middleware.js'
import { normalApiLimiter } from '../middleware/rate limiter/authRateLimiter.js'


export const historyRoutes = Router()

historyRoutes.get('/', normalApiLimiter, authLayer, activeFarmer, validate(getAllPredictHistorySchema), getPredictedHistory)
historyRoutes.get('/:predictionId', normalApiLimiter, authLayer, activeFarmer, validate(getSinglePredictHistorySchema), getSinglePredictHistory)