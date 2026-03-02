import { Router } from "express"
import { validate } from "../middleware/validate.middleware.js"
import { subscribeToNewsletterSchema, unSubscribeToNewsletterSchema } from "../validator/public.validator.js"
import { subscribeToNewsLetter, unSubscribeToNewsletter } from "../controllers/newsletter.controller.js"

export const publicRoutes = Router()

publicRoutes.post("/newsletter/subscribe", validate(subscribeToNewsletterSchema), subscribeToNewsLetter)

publicRoutes.post("/newsletter/unsubscribe/:token", validate(unSubscribeToNewsletterSchema), unSubscribeToNewsletter)