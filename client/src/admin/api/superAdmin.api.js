import { api } from "@/lib/axios"

export const superAdminDashboard = async ()=>{
    const {data} = await api.get("/admin/super-admin/dashboard")
    return data
}

export const getAllAdmins = async ()=>{
    const {data} = await api.get("/admin/super-admin/admins")
    return data
}