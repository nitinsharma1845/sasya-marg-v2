import { Router } from 'express'
import { authLayer } from '../middleware/auth.middleware.js'
import { currentUser } from '../controllers/auth.controller.js'
import { normalApiLimiter } from '../middleware/rate limiter/authRateLimiter.js'

export const authRouter = Router()

authRouter.get("/me", normalApiLimiter, authLayer, currentUser)