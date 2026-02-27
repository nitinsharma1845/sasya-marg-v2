import { api } from "@/lib/axios"

export const superAdminDashboard = async () => {
    const { data } = await api.get("/admin/super-admin/dashboard")
    return data
}

export const getAllAdmins = async (searchParams) => {
    const { data } = await api.get("/admin/super-admin/admins", { params: Object.fromEntries(searchParams.entries()) })
    return data
}

export const getAllFarmers = async (searchParams) => {
    const { data } = await api.get("/admin/farmer", { params: Object.fromEntries(searchParams.entries()) })
    return data
}

export const getAllBuyer = async (searchParams) => {
    const { data } = await api.get("/admin/buyer", { params: Object.fromEntries(searchParams.entries()) })
    return data
}

export const getAdminById = async (adminId) => {
    const { data } = await api.get(`/admin/super-admin/admin/${adminId}`)
    return data
}

export const getFarmerById = async (farmerId) => {
    const { data } = await api.get(`/admin/farmer/${farmerId} `)
    return data
}

export const getBuyerById = async (buyerId) => {
    const { data } = await api.get(`/admin/buyer/${buyerId} `)
    return data
}

export const getLogs = async (searchParams) => {
    const { data } = await api.get("/admin/super-admin/logs", { params: Object.fromEntries(searchParams.entries()) })
    return data
}