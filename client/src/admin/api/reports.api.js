import { api } from "@/lib/axios"

export const getAllFarmerQueries = async (searchParams) => {
    const { data } = await api.get("/admin/queries", { params: Object.fromEntries(searchParams.entries()) })
    return data
}

export const getSingleQuery = async (id) => {
    const { data } = await api.get(`/admin/queries/${id}`)
    return data
}

export const replyQuery = async ({ id, reply }) => {
    const { data } = await api.patch(`/admin/queries/${id}/reply`, { reply })
    return data
}