import { createLimiter } from "./rateLimiter.middleware.js";

export const subscribeToNewsletterLimiter = createLimiter({
    windowMs: 1000 * 60 * 5, //5 minutes
    max: 1,
    message: "Too many subscription requests. Please wait before retrying"
})

export const queryLimiter = createLimiter({
    windowMs: 1000 * 60 * 5, //5 minutes
    max: 2,
    message: "Too many query requests. Please wait before retrying"
})