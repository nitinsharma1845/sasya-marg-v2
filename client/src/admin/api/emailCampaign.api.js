import { api } from "@/lib/axios"

export const createCampaign = async (payload) => {
    const { data } = await api.post("/campaign/", payload)
    return data
}

export const getCampaign = async (searchParams) => {
    const { data } = await api.get("/campaign", { params: Object.fromEntries(searchParams.entries()) })
    return data
}
