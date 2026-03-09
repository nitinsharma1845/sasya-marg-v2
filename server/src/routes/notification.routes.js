import { Router } from "express"
import { validate } from "../middleware/validate.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"
import { authorize } from "../middleware/role.middleware.js"
import { createApiLimiter, normalApiLimiter } from "../middleware/rate limiter/authRateLimiter.js"
import { deleteNotificationSchema, getAnnouncementSchema, getNotificationSchema, getUnreadNotificationCountSchema, readAllNotificationCountSchema, readNotificationSchema, sendAnnouncementSchema } from "../validator/notification.validator.js"
import { deleteNotification, getAnnouncements, getNotification, getUnreadNotificationCount, readAllNotification, readNotification, sendAnnouncement } from "../controllers/notification.controller.js"
import { requireSuperAdmin } from "../middleware/adminRole.middleware.js"



export const notificationRoutes = Router()


notificationRoutes.get("/unread/:userId", normalApiLimiter, authLayer, authorize("farmer", "buyer"), validate(getUnreadNotificationCountSchema), getUnreadNotificationCount)

notificationRoutes.patch("/read-all/:userId", normalApiLimiter, authLayer, authorize("farmer", "buyer"), validate(readAllNotificationCountSchema), readAllNotification)

notificationRoutes.patch("/read/:userId/:notificationId", normalApiLimiter, authLayer, authorize("farmer", "buyer"), validate(readNotificationSchema), readNotification)

notificationRoutes.delete("/:userId/:notificationId", normalApiLimiter, authLayer, authorize("farmer", "buyer"), validate(deleteNotificationSchema), deleteNotification)

notificationRoutes.post("/", createApiLimiter, authLayer, requireSuperAdmin, validate(sendAnnouncementSchema), sendAnnouncement)

notificationRoutes.get("/", normalApiLimiter, authLayer, requireSuperAdmin, validate(getAnnouncementSchema), getAnnouncements)


notificationRoutes.get("/:userId", normalApiLimiter, authLayer, authorize("farmer", "buyer"), validate(getNotificationSchema), getNotification)