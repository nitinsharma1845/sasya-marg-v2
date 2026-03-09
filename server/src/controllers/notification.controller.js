import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { deleteNotificationService, getAnnouncementsService, getNotificationsService, getUnreadNotificationCountService, readAllNotificationService, readNotificationService, sendAnnouncementService } from "../services/notification.service.js";

export const getNotification = asyncHandler(async (req, res) => {
    const userId = req.params.userId
    const query = req.query

    const notifications = await getNotificationsService({ userId, query })

    return res.status(200).json(new ApiResponse(200, notifications, "Notification fetched successfully"))
})

export const getUnreadNotificationCount = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const count = await getUnreadNotificationCountService({ userId })

    return res.status(200).json(new ApiResponse(200, count, "Notification count fetched successfully"))
})

export const readAllNotification = asyncHandler(async (req, res) => {
    const { userId } = req.params

    const notifications = await readAllNotificationService({ userId })
    return res.status(200).json(new ApiResponse(200, notifications, "All notificates set to read"))
})

export const readNotification = asyncHandler(async (req, res) => {
    const { userId, notificationId } = req.params
    const notification = await readNotificationService({ userId, notificationId })

    return res.status(200).json(new ApiResponse(200, notification, "Notification set to read"))
})

export const deleteNotification = asyncHandler(async (req, res) => {
    const { userId, notificationId } = req.params
    await deleteNotificationService({ userId, notificationId })
    return res.status(200).json(new ApiResponse(200, null, "Notification delete"))
})

export const sendAnnouncement = asyncHandler(async (req, res) => {
    const { role, title, message, redirectUrl } = req.body

    const announcement = await sendAnnouncementService({ role, title, message, redirectUrl })

    return res.status(201).json(new ApiResponse(201, announcement, "Announcement send to all users"))
})

export const getAnnouncements = asyncHandler(async (req, res) => {
    const query = req.query

    const { announcements, pagination } = await getAnnouncementsService({ query })

    return res.status(200).json(new ApiResponse(200, { announcements, pagination }, "Announcements fertched successsfully"))
})