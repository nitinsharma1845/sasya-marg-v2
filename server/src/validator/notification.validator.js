import { z } from 'zod'

const objectId = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const sendAnnouncementSchema = z.object({
    body: z.object({
        role: z.enum(["farmer", "buyer"]),
        title: z.string(),
        message: z.string(),
        redirectUrl: z.string().optional()
    })
})

export const getNotificationSchema = z.object({
    params: z.object({
        userId: objectId
    }),
    query: z.object({
        isRead: z.coerce.boolean().optional(),
    })
})

export const getUnreadNotificationCountSchema = z.object({
    params: z.object({
        userId: objectId
    })
})

export const readAllNotificationCountSchema = z.object({
    params: z.object({
        userId: objectId
    })
})

export const readNotificationSchema = z.object({
    params: z.object({
        userId: objectId,
        notificationId: objectId
    })
})

export const deleteNotificationSchema = z.object({
    params: z.object({
        userId: objectId,
        notificationId: objectId
    })
})

export const getAnnouncementSchema = z.object({
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