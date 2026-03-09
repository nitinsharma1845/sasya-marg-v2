import Notification from "../models/notification.model.js";
import { Farmer } from "../models/farmer.model.js"
import { Buyer } from "../models/buyer.model.js"

export const createNotification = async ({
    userId,
    role,
    type,
    title,
    message,
    entityId = null,
    entityType = null,
    redirectUrl = null,
    meta = {},
    expiresInDays = 30
}) => {

    const expiresAt = new Date(
        Date.now() + expiresInDays * 24 * 60 * 60 * 1000
    );

    const notification = await Notification.create({
        userId,
        role,
        type,
        title,
        message,
        entityId,
        entityType,
        redirectUrl,
        meta,
        expiresAt
    });

    return notification;
};

export const createBulkNotifications = async ({
    users,
    role,
    type,
    title,
    message,
    entityId = null,
    entityType = null,
    redirectUrl = null,
    meta = {},
    expiresInDays = 30
}) => {

    const expiresAt = new Date(
        Date.now() + expiresInDays * 24 * 60 * 60 * 1000
    )

    const notifications = users.map(user => ({
        userId: user._id ?? user,
        role,
        type,
        title,
        message,
        entityId,
        entityType,
        redirectUrl,
        meta,
        expiresAt
    }))

    return Notification.insertMany(notifications)
}

export const sendAnnouncementService = async ({
    role,
    title,
    message,
    redirectUrl = null
}) => {

    let users

    if (role === "farmer") {
        users = await Farmer.find({}, "_id")
    }

    if (role === "buyer") {
        users = await Buyer.find({}, "_id")
    }

    await createBulkNotifications({
        users,
        role,
        type: "ADMIN_MESSAGE",
        title,
        message,
        redirectUrl
    })

    return {
        success: true,
        total: users.length
    }
}

export const getNotificationsService = async ({ userId, query }) => {
    const { isRead } = query

    const filter = { userId }

    if (isRead !== undefined) {
        filter.isRead = isRead
    }

    const notifications = await Notification.find(filter)
    return notifications
}

export const getUnreadNotificationCountService = async ({ userId }) => {
    const count = await Notification.countDocuments({ userId, isRead: false })
    return count
}

export const readAllNotificationService = async ({ userId }) => {
    const notifications = await Notification.updateMany(
        { userId, isRead: false },
        { $set: { isRead: true } }
    )

    return notifications
}

export const readNotificationService = async ({ userId, notificationId }) => {

    const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, userId },
        { $set: { isRead: true } },
        { new: true }
    )

    return notification
}

export const deleteNotificationService = async ({ userId, notificationId }) => {

    await Notification.deleteOne({
        _id: notificationId,
        userId
    })

    return true

}

export const getAnnouncementsService = async ({ query }) => {
    const { page = 1, limit = 10 } = query

    const skip = (Number(page) - 1) * Number(limit)

    const [announcements, total] = await Promise.all([
        Notification.find({ type: "ADMIN_MESSAGE" })
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(skip)
            .lean(),
        Notification.countDocuments({ type: "ADMIN_MESSAGE" })
    ])

    return {
        announcements,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }
}