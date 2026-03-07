import { Router } from "express"
import { validate } from "../middleware/validate.middleware.js"
import { publicQuerySchema, subscribeToNewsletterSchema, unSubscribeToNewsletterSchema } from "../validator/public.validator.js"
import { subscribeToNewsLetter, unSubscribeToNewsletter } from "../controllers/newsletter.controller.js"
import { createPublicQuery } from "../controllers/publicQuery.controller.js"
import { queryLimiter, subscribeToNewsletterLimiter } from "../middleware/rate limiter/publicRateLimiter.js"

export const publicRoutes = Router()

publicRoutes.post("/newsletter/subscribe", subscribeToNewsletterLimiter, validate(subscribeToNewsletterSchema), subscribeToNewsLetter)

publicRoutes.post("/newsletter/unsubscribe/:token", subscribeToNewsletterLimiter, validate(unSubscribeToNewsletterSchema), unSubscribeToNewsletter)

publicRoutes.post("/query", queryLimiter, validate(publicQuerySchema), createPublicQuery)