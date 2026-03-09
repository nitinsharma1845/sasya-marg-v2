import { z } from "zod"

const objectId = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const sendEmailCampaignSchema = z.object({
    body: z.object({
        title: z
            .string()
            .min(3, "Title must be at least 3 characters")
            .max(120, "Title cannot exceed 120 characters"),

        subject: z
            .string()
            .min(3, "Subject must be at least 3 characters")
            .max(150, "Subject cannot exceed 150 characters"),

        message: z
            .string()
            .min(5, "Message must be at least 5 characters")
            .max(5000, "Message too long")
    })
})

export const getCampaignsSchema = z.object({
    query: z.object({
        page: z.coerce
            .number()
            .int()
            .positive()
            .default(1),

        limit: z.coerce
            .number()
            .int()
            .min(1)
            .max(50)
            .default(10)
    })
})

export const getCampaignStatusScheme = z.object({
    params: z.object({
        campaignId: objectId
    })
})