import { api } from "@/lib/axios"

export const getAllSchemes = async (searchParams) => {
    const { data } = await api.get("/admin/schemes", { params: Object.fromEntries(searchParams.entries()) })
    return data
}

export const getSingleScheme = async (schemeId) => {
    const { data } = await api.get(`/admin/schemes/${schemeId}`)
    return data
}

export const toggleSchemeStatus = async (schemeId) => {
    const { data } = await api.patch(`/admin/schemes/${schemeId}/toggle`)
    return data
}

export const createScheme = async (payload) => {
    const { data } = await api.post(`/admin/schemes`, payload)
    return data
}

export const updateScheme = async ({ id, payload }) => {
    const { data } = await api.patch(`/admin/schemes/${id}`, payload)
    return data
}