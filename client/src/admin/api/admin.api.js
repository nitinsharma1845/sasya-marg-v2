import { api } from "@/lib/axios"

export const getInvites = async (searchParams) => {
    const { data } = await api.get("/admin/invites", { params: Object.fromEntries(searchParams.entries()) })
    return data
}

export const revokeInvite = async (inviteId) => {
    const { data } = await api.delete(`/admin/invites/revoke/${inviteId}`,)
    return data
}

export const blockFarmer = async (payload) => {
    const { data } = await api.patch(`/admin/farmer/${payload.farmerId}/block`, { reason: payload.reason })
    return data
}

export const unBlockFarmer = async (farmerId) => {
    const { data } = await api.patch(`/admin/farmer/${farmerId}/unblock`)
    return data
}


export const getAdminDasboard = async () => {
    const { data } = await api.get("/admin/dashboard")
    return data
}

export const blockBuyer = async (payload) => {
    const { data } = await api.patch(`/admin/buyer/${payload.buyerId}/block`, { reason: payload.reason })
    return data
}

export const unblockBuyer = async (buyerId) => {
    const { data } = await api.patch(`/admin/buyer/${buyerId}/unblock`)
    return data
}

export const getProfile = async () => {
    const { data } = await api.get("/admin")
    return data
}

export const changePassword = async (payload) => {
    const { data } = await api.patch("/admin/change-password", payload)
    return data
}

export const changeName = async (payload) => {
    const { data } = await api.patch("/admin/change-name", payload)
    return data
}