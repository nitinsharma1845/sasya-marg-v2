import { z } from 'zod'

export const subscribeToNewsletterSchema = z.object({
    body: z.object({
        email: z.email()
    })
})

export const unSubscribeToNewsletterSchema = z.object({
    params: z.object({
        token: z.string().length(64, "Invalid token : Token must be of 64 character")
    })
})