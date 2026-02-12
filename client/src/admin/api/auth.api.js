import { api } from "@/lib/axios"

export const loginAdmin = async(payload)=>{
    const {data} = await api.post("/admin/login", payload)
    return data
}

export const logoutAdmin = async()=>{
    const {data} = await api.post("/admin/logout")
    return data
}