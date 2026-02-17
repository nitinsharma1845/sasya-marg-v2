import { api } from "@/lib/axios"

export const getHarvestedProducts = async (searchParams) => {
    const { data } = await api.get("/admin/listings/harvested", { params: Object.fromEntries(searchParams.entries()) })
    return data
}



export const getPreHarvestedProducts = async (searchParams) => {
    const { data } = await api.get("/admin/listings/pre-harvested", { params: Object.fromEntries(searchParams.entries()) })
    return data
}

