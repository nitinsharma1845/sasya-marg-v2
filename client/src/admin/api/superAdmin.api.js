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