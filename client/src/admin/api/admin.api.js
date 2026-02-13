import { api } from "@/lib/axios"

export const getInvites = async (searchParams) => {
    const { data } = await api.get("/admin/invites", { params: Object.fromEntries(searchParams.entries()) })
    return data
}

export const revokeInvite = async (inviteId) => {
    const { data } = await api.delete(`/admin/invites/revoke/${inviteId}`,)
    return data
}