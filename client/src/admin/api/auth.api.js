import { api } from "@/lib/axios"

export const loginAdmin = async (payload) => {
    const { data } = await api.post("/admin/login", payload)
    return data
}

export const logoutAdmin = async () => {
    const { data } = await api.post("/admin/logout")
    return data
}

export const inviteAdmin = async () => {
    const { data } = await api.get("/admin/super-admin/invite")
    return data
}

export const signupAdmin = async (payload) => {
    const { data } = await api.post(`/admin/register?inviteToken=${payload.token}`, payload)
    return data
}