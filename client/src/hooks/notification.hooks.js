import {
    deleteNotification,
    getAnnouncement,
    getNotification,
    readAllNotification,
    readNotification,
    sendNotification,
    unreadNotificationCount
} from "@/api/notification.api"
import { queryClient } from "@/lib/queryClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"

export const useGetNotification = (userId, isRead) => {
    return useQuery({
        queryKey: ["notifications", userId, { isRead }],
        queryFn: () => getNotification(userId, isRead),
        enabled: !!userId,
    })
}

export const useGetUnreadNotificationCount = (userId) => {
    return useQuery({
        queryKey: ['notifications', 'unread', userId],
        queryFn: () => unreadNotificationCount(userId),
        enabled: !!userId,
    })
}

export const useReadNotification = () => {
    return useMutation({
        mutationFn: readNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
            toast.success("Marked as read")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Action failed")
        }
    })
}

export const useReadAllNotifications = () => {
    return useMutation({
        mutationFn: readAllNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
            toast.success("All caught up!")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Action failed")
        }
    })
}

export const useDeleteNotification = () => {
    return useMutation({
        mutationFn: deleteNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
            toast.success("Notification removed")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Delete failed")
        }
    })
}

export const useSendNotification = () => {
    return useMutation({
        mutationFn: sendNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
            toast.success("Notification send")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Notification failed")
        }
    })
}

export const useGetAnnouncement = () => {
    const [searchParams] = useSearchParams()
    return useQuery({
        queryKey: ['notification', Object.fromEntries(searchParams.entries())],
        queryFn: () => getAnnouncement(searchParams)
    })
}