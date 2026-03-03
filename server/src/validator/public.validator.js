import { z } from 'zod'

const objectId = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");


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

export const publicQuerySchema = z.object({
    body: z.object({
        firstname: z.string(),
        lastname: z.string().optional(),
        email: z.email(),
        phone: z
            .string()
            .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
        message: z.string(),
        role: z.enum(["farmer", "buyer", "guest"])
    })
})

export const getAllPublicQueriesSchema = z.object({
    query: z.object({
        page: z
            .string()
            .optional()
            .transform((val) => (val ? parseInt(val) : 1))
            .refine((val) => val > 0, {
                message: "Page must be greater than 0"
            }),

        limit: z
            .string()
            .optional()
            .transform((val) => (val ? parseInt(val) : 20))
            .refine((val) => val > 0 && val <= 100, {
                message: "Limit must be between 1 and 100"
            }),
        search: z.string().optional(),
        status: z.enum(["pending", "in-progress", "resolved"]).optional(),
        role: z.enum(["farmer", "buyer", "guest"]).optional()
    })
})

export const replyToPublicQuerySchema = z.object({
    params: z.object({
        queryId: objectId,
    }),
    body: z.object({
        reply: z.string()
    })
})