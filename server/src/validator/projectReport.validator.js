import { z } from 'zod'

export const createReportSchema = z.object({
    body: z.object({
        refrence: z.string().optional(),
        reason: z.enum([
            "FAKE_PRODUCT",
            "MISLEADING_INFO",
            "PRICE_FRAUD",
            "DUPLICATE_LISTING",
            "SPAM",
            "OTHER"
        ]),
        description: z.string().min(3).optional(),

    })
})

export const getAllReportSchema = z.object({
    params: z.object({
        page: z.coerce.number().optional(),
        limit: z.coerce.number().optional(),
        status: z.enum(["pending", "reviewed", "action_taken", "rejected"]).optional(),
        reason: z.enum([
            "FAKE_PRODUCT",
            "MISLEADING_INFO",
            "PRICE_FRAUD",
            "DUPLICATE_LISTING",
            "SPAM",
            "OTHER"
        ]).optional()
    })
})