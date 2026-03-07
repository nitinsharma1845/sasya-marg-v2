import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { getSuggestionSchema } from '../validator/cropSuggestion.validator.js'
import { getSuggestion } from '../controllers/cropRecommendation.controller.js'
import { getSuggestionLimiter } from '../middleware/rate limiter/suggestionRateLimiter.js'
import { authorize } from '../middleware/role.middleware.js'
import { activeFarmer } from '../middleware/aciveFarmer.middleware.js'


export const suggestionRoutes = Router()


suggestionRoutes.get("/:farmLandId", getSuggestionLimiter, authLayer, activeFarmer, authorize("farmer"), validate(getSuggestionSchema), getSuggestion)


