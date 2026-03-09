import { api } from "@/lib/axios"

export const getNotification = async (userId, isRead) => {
    const params = isRead !== undefined ? { isRead } : {}
    const { data } = await api.get(`/notification/${userId}`, { params })
    return data
}

export const unreadNotificationCount = async (userId) => {
    const { data } = await api.get(`/notification/unread/${userId}`)
    return data
}

export const readAllNotification = async (userId) => {
    const { data } = await api.patch(`/notification/read-all/${userId}`)
    return data
}

export const readNotification = async ({ userId, notificationId }) => {
    const { data } = await api.patch(`/notification/read/${userId}/${notificationId}`)
    return data
}

export const deleteNotification = async ({ userId, notificationId }) => {
    const { data } = await api.delete(`/notification/${userId}/${notificationId}`)
    return data
}

export const sendNotification = async (payload) => {
    const { data } = await api.post("/notification/", payload)
    return data
}

export const getAnnouncement = async (searchParams) => {
    const { data } = await api.get("/notification", { params: Object.fromEntries(searchParams.entries()) })
    return data
}