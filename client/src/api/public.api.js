import { api } from "@/lib/axios"

export const subscribeToNewsletter = async (payload) => {
    const { data } = await api.post("/public/newsletter/subscribe", payload)
    return data
}

export const unSubscribeToNewsletter = async (token) => {
    const { data } = await api.post(`/public/newsletter/unsubscribe/${token}`)
    return data
}